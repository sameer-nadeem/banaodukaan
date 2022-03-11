const Merchant = require("../models/merchant.model");
const Customer = require("../models/customer.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const sendMail = require("../util/email");
const jwt = require("jsonwebtoken");
const config = require("config");

const authStore = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.user.id);
    const storeId = req.storeId;
    console.log("stores", merchant.myStores, mongoose.Types.ObjectId(storeId));

    if (!merchant.myStores.includes(mongoose.Types.ObjectId(storeId))) {
      return res.status(401).json({ error: "UNAUTHORISED_FOR_THIS_STORE" });
    }

    return res.status(200).json({ merchant });
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};

const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email === "") return res.json({ error: "NO_EMAIL_PROVIDED" });

    if (!password || password === "")
      return res.json({ error: "NO_PASSWORD_PROVIDED" });

    const customer = await Customer.findOne({
      email,
      storeId: req.storeId,
    });

    if (!customer) {
      return res.status(400).json({
        error: "INVALID_CREDITS",
      });
    }

    const passMatch = await bcrypt.compare(password, customer.password);
    const type = "Customer";
    if (passMatch) {
      const token = jwt.sign(
        {
          type,
          id: customer._id,
        },
        config.get("token-secret"),
        {
          expiresIn: 360000,
        }
      );
      return res.status(200).json({
        token: token,
        id: customer._id,
      });
    } else {
      return res.status(400).json({
        error: "INVALID_CREDITS",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "SERVER_ERROR",
    });
  }
};

const customerSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await Customer.exists({
      email,
      storeId: req.storeId,
    });

    if (exists) {
      return res.status(400).json({
        error: "USER_ALREADY_EXIST",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = new Customer({
      firstName,
      lastName,
      email,
      storeId: req.storeId,
      password: hashedPassword,
      phone: "",
      country: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
    });

    customer.save();

    sendMail({
      to: customer.email,
      subject: "Welcome to Banaodukaan",
      html: "Congratulation on Sign Up",
    });

    const payload = {
      type: "Customer",
      id: customer._id,
    };
    console.log("hererer");

    const token = jwt.sign(payload, config.get("token-secret"), {
      expiresIn: 360000,
    });
    return res.status(200).json({
      token: token,
      id: customer._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "SERVER_ERROR",
    });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id)
    console.log(customer);
    return res.status(200).json({
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "SERVER_ERROR" });
  }
};

module.exports = {
  authStore,
  customerLogin,
  customerSignUp,
  getCustomer,
};
