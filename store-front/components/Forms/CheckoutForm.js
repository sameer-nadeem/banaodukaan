import CheckoutDetails from "./CheckoutDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useURL from "../../utils/useURL";
import Router from 'next/router'
import AlertDialog from "../../components/AlertDialog"

const CheckoutForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [cart, setCart] = useState({ products: [] });
  const [isEmpty, setEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [length, setLength] = useState(0);

  const [showError, setShowError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [terms, setTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [postalCode, setPostalCode] = useState(0);
  const [userId, setUserId] = useState("");

  const refreshCart = useSelector(state => state.cart.refresh)
  const dispatch = useDispatch()

  const [variant, serVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("")
  const [alertTitle, setAlertTitle] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [alertDialogShows, setAlertDialogShows] = useState(false)
  const handleShow = () => setAlertDialogShows(true)
  const handleClose = () => {
    setAlertDialogShows(false)
    Router.push('/')
  }




  useEffect(() => {
    setShowError(false);
    user !== null ? setUserId(user._id) : setUserId("");
    user !== null ? setFullName(user.firstName) : setFullName("");
    user !== null ? setEmail(user.email) : setEmail("");
    user !== null ? setAddress(user.address) : setAddress("");
  }, [user]);

  function updateCart() {
    let cs = localStorage.getItem("cart");

    if (!cs) {
      setEmpty(true);
      return;
    } else {
      // console.log(cs);
      cs = JSON.parse(cs);
      setLength(cs.products.length);
      setCart(cs);
      // console.log('cart' , cart)
    }
  }

  useEffect(() => {
    updateCart();
  }, [refreshCart]);

  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const onChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const onChangePostalCode = (event) => {
    setPostalCode(event.target.value);
  };
  const onChangeTerms = (event) => {
    setTerms(event.target.value);
  };
  const onchangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleClick = async () => {
    if (
      city === "" ||
      address === "" ||
      phoneNumber === "" ||
      terms === false ||
      fullName === "" ||
      email === "" ||
      postalCode === "" ||
      cart.products.length === 0
    ) {
      console.log("Show error");
      console.log(user);
      return
    }
    // making the body here
    const body = {
      fullName,
      email,
      phoneNumber,
      postalCode,
      city,
      userId,
      cart,
      address,
    };

    try {
      const url = useURL();
      await axios.post(`${url}/api/cart`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cart1 = {
        products:[] ,
        total : 0
      }

      JSON.stringify(cart1)
      localStorage.setItem("cart", JSON.stringify(cart1))
      dispatch({type:"REFRESH_CART"})
      setCart(cart1)
      handleShow()
      setAlertTitle("Success!")
      setAlertMessage("Order was successfully Placed!")
      serVariant("success")
      

    } catch(err) {
      console.log(err);
      handleShow()
      setAlertTitle("Ooops!")
      setAlertMessage("There was a problem placing your Order!")
      serVariant("failure")
      
    }
  };
  return (
    <div>
      <AlertDialog
        handleClose={handleClose}
        handleShow={handleShow}
        show={alertDialogShows}
        title={alertTitle}
        message={alertMessage}
        variant={variant}
      />
      <div class="checkout_area section-padding-80">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="checkout_details_area mt-50 clearfix">
                <div class="cart-page-heading mb-30">
                  <h5>Billing Address</h5>
                </div>

                <form action="#" method="post">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <label for="first_name">
                        Full Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="first_name"
                        value={fullName}
                        onChange={onChangeFullName}
                        disabled={user !== null ? true : false}
                        required
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="street_address">
                        Address <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control mb-3"
                        id="street_address"
                        value={address}
                        onChange={onchangeAddress}
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="postcode">
                        Postcode <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="postcode"
                        value={postalCode}
                        onChange={onChangePostalCode}
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="city">
                        Town/City <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        value={city}
                        onChange={onChangeCity}
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="phone_number">
                        Phone No <span>*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="phone_number"
                        // min="0"
                        value={phoneNumber}
                        onChange={onChangePhoneNumber}
                      />
                    </div>
                    <div class="col-12 mb-4">
                      <label for="email_address">
                        Email Address <span>*</span>
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email_address"
                        value={email}
                        onChange={onChangeEmail}
                        disabled={user !== null ? true : false}
                      />
                    </div>

                    <div class="col-12">
                      <div class="custom-control custom-checkbox d-block mb-2">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                          value={terms}
                          onChange={onChangeTerms}
                        />
                        <label class="custom-control-label" for="customCheck1">
                          Terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <CheckoutDetails buttonClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
