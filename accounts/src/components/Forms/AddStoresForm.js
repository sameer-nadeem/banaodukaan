import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import countryList from "react-select-country-list";
import Select from "react-select";
let validationCancelToken;

// import { AlertTitle } from "@mui/material";

const AddStoresForm = () => {
  //success modal
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const handleClose = () => {
    setShow(false);
    redirectCheck && history("/my-stores");
  };
  const handleShow = () => setShow(true);
  //success modal states end
  //defining the appropriate states for each field in the form
  const options = useMemo(() => countryList().getData(), []);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [adress, setAdress] = useState("");

  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [phone, setPhone] = useState(0);
  const [website, setWebsite] = useState("");
  const [apartment, setApartment] = useState("");
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [titleAlert, setAlertTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [redirectCheck, setRedirectCheck] = useState(false);
  //set the relevant fields once their state changes
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const onChangeAdress = (event) => {
    setAdress(event.target.value);
  };
  const onChangeCountry = (value) => {
    setValue(value);
  };

  const onChangePostalCode = (event) => {
    setPostalCode(event.target.value);
  };
  const onChangeApartment = (event) => {
    setApartment(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const onChangeWebsite = (event) => {
    setWebsite(event.target.value);
  };
  //getting the merchant profile details, can be done via global state as well
  const getProfile = async () => {
    try {
      const res = await axios.get(`/api/merchant/profile`, {});
      setFirstName(res.data.merchant.firstName);
      setLastName(res.data.merchant.lastName);
    } catch (err) {
      console.log(err);
    }
  };
  // function to add store
  const addStores = async (event) => {
    // prevent the default action of onSubmit function
    event.preventDefault();

    const data = {
      title: title,
      adress: adress,
      city: city,
      postalCode: postalCode,
      phone: phone,
      website: website,
      country: value.label,
    };

    console.log(data);
    //try to send a post request
    try {
      await axios.post(`/api/merchant/store`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //if the request is successful, alert displayed and merchant redirected to stores
      setRedirectCheck(true);
      setAlertTitle("Store Added");
      setMsg("The Store was succesfuly created");
      setStatus("success");
      handleShow();
    } catch (err) {
      // in case of error, appropriate alert is displayed
      console.log(err);
      setRedirectCheck(false);
      setAlertTitle("Error");
      setMsg("Store with same name already exists");
      setStatus("failure");
      handleShow();
    }
  };

  useEffect(() => {
    //Runs only on the first render
    getProfile();
  }, []);

  const [titleError, setTitleError] = useState(null);
  useEffect(() => {
    //regex for making sure that valid store title is entered
    const titleRegex = /^((?!-)[a-z0-9-]{0,63}[a-z0-9]\.)+[a-z]{2,63}$/;
    const validateStoreTitle = async () => {
      validationCancelToken && validationCancelToken.cancel();
      validationCancelToken = axios.CancelToken.source();
      //checking whether the store name already exists
      const { data } = await axios.get(
        `/api/merchant/new-store/validate?store=${title}`,
        { cancelToken: validationCancelToken.token }
      );
      if (!data.isValid) {
        setTitleError("This title is already taken");
      }
    };
    //In case the title entered does not match the format specified, appropriate output displayed
    const TitleError = () => (
      <ul>
        <li>Store title cannot contain spaces</li>
        <li>Store title cannot start or end with a number</li>
        <li>Store title cannot start or end with an underscore</li>
      </ul>
    );

    if (title !== "") {
      if (!titleRegex.test(`${title}.banaodukaan.com`)) {
        setTitleError(<TitleError />);
      } else {
        setTitleError(null);
        validateStoreTitle();
      }
    } else {
      setTitleError(null);
    }
  }, [title]);
  // for rendering the actual form with appropriate fields and onChange functions assigned to each field as made above
  return (
    <div>
      <Alert
        title={titleAlert}
        message={msg}
        show={show}
        variant={status}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <form style={{ paddingTop: 25 }}>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <i
              style={{ cursor: "pointer" }}
              onClick={() => history("/my-stores")}
              class="fas mb-5 fa-2x fa-arrow-left"
            ></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>Create Store</h1>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <div className="row">
                <div className="col">
                  <label className="form-label" style={{ color: "black" }}>
                    Title{" "}
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeTitle}
                    value={title}
                    required
                  />
                  <span className="text-danger" style={{ fontWeight: "bold" }}>
                    {titleError && titleError}
                  </span>
                </div>
                <div className="col">
                  <label className="form-label" style={{ color: "black" }}>
                    Store's URL
                  </label>
                  <input
                    className="form-control"
                    style={{
                      backgroundColor: "white",
                      color: "#3F8BC5",
                      fontWeight: "bold",
                    }}
                    value={`${title === "" ? "*" : title}.banaodukaan.com`}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Country/region
              </label>
              <Select
                options={options}
                value={value}
                onChange={onChangeCountry}
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    First name
                  </label>
                  <input
                    className="form-control"
                    value={firstName}
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Last name
                  </label>
                  <input
                    className="form-control"
                    value={lastName}
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Address
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeAdress}
                required
              />
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Apartment,suite,etc.
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeApartment}
                value={apartment}
                required
              />
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    City
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeCity}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Postal code
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangePostalCode}
                    required
                  />
                </div>
              </div>
              <div className="mb-3" style={{ paddingTop: 25 }}>
                <label className="form-label" style={{ color: "black" }}>
                  Phone
                </label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangePhone}
                  required
                />
              </div>

              <div className="mb-3" style={{ paddingTop: 25 }}>
                <label className="form-label" style={{ color: "black" }}>
                  Business or personal website(optional)
                </label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangeWebsite}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div
            className="card"
            style={{
              padding: 40,
              paddingTop: 25,
              width: "85%",
              backgroundColor: "white",
            }}
          >
            <button
              className="btn btn-success"
              style={{ width: "25%" }}
              onClick={(e) => addStores(e)}
              disabled={titleError !== null || title === ""}
            >
              Add Store
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStoresForm;
