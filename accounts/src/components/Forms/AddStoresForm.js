import { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import countryList from "react-select-country-list";
import Select from "react-select";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import { Button } from "@material-ui/core";
import { ProgressBar } from "react-bootstrap";
import useURL from "../../utils/useURL";

let validationCancelToken;

// import { AlertTitle } from "@mui/material";

const AddStoresForm = () => {
  //success modal
  const url = useURL();
  const topRef = useRef(null);
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
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadPercentageTwo, setUploadPercentageTwo] = useState(0);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [phone, setPhone] = useState(0);
  const [website, setWebsite] = useState("");
  const [apartment, setApartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [logo, setLogo] = useState([]);
  const [cover, setCover] = useState([]);
  const [logoPath, setLogoPath] = useState("");
  const [coverPath, setCoverPath] = useState("");
  const [lastName, setLastName] = useState("");
  const [titleAlert, setAlertTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [redirectCheck, setRedirectCheck] = useState(false);
  const [buttonCheck, setButtonCheck] = useState(false);
  const [buttonCheckTwo, setButtonCheckTwo] = useState(false);
  const [logoSrc, setLogoSrc] = useState("");
  const [coverSrc, setCoverSrc] = useState("");

  //set the relevant fields once their state changes
  const onChangeLogo = (event) => {
    setLogo(event.target.files[0]);
  };
  const onChangeCover = (event) => {
    setCover(event.target.files[0]);
  };
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
  const uploadLogo = async (event) => {
    event.preventDefault();

    if (logo.length === 0) {
      setAlertTitle("Error");
      setMsg("Please select the image first");
      setStatus("failure");
      topRef.current.scrollIntoView();
    } else {
      const formData = new FormData();
      formData.append("myLogo", logo);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          if (percentage < 100) setUploadPercentage(Math.floor(percentage));
          console.log(percentage);
        },
      };
      try {
        const res = await axios.post(
          `/api/merchant/store/logo`,
          formData,
          config
        );
        setButtonCheck(true);
        setLogoPath(res.data);
        var img_url = `${url + res.data}`;
        img_url = img_url.replace(/\\+\b/g, "/");
        setLogoSrc(img_url);
        console.log("logo src", img_url);
        setUploadPercentage(
          100,
          setTimeout(() => {
            setUploadPercentage(0);
          }, 1000)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const uploadCover = async (event) => {
    event.preventDefault();

    if (cover.length === 0) {
      setAlertTitle("Error");
      setMsg("Please select the image first");
      setStatus("failure");
      topRef.current.scrollIntoView();
    } else {
      const formData = new FormData();
      formData.append("myCover", cover);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          if (percentage < 100) setUploadPercentageTwo(Math.floor(percentage));
          console.log(percentage);
        },
      };
      try {
        const res = await axios.post(
          `/api/merchant/store/cover`,
          formData,
          config
        );
        setButtonCheckTwo(true);
        setCoverPath(res.data);
        var img_url = `${url + res.data}`;
        img_url = img_url.replace(/\\+\b/g, "/");
        setCoverSrc(img_url);
        setUploadPercentageTwo(
          100,
          setTimeout(() => {
            setUploadPercentageTwo(0);
          }, 1000)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // function to add store
  const addStores = async (event) => {
    // prevent the default action of onSubmit function
    event.preventDefault();
    if (
      title === "" ||
      adress === "" ||
      city === "" ||
      postalCode === "" ||
      phone === "" ||
      website === "" ||
      value.label === ""
    ) {
      handleShow();
      setAlertTitle("Error");
      setMsg("Please fill in all of the fields");
      setStatus("failure");
      return;
      //we will add toastify here
    } else if (!buttonCheck || logo.length === 0) {
      setRedirectCheck(false);
      setAlertTitle("Error");
      setMsg("Upload Logo First");
      setStatus("failure");
      handleShow();
      topRef.current.scrollIntoView();
      return;
    } else if (!buttonCheckTwo || cover.length === 0) {
      setRedirectCheck(false);
      setAlertTitle("Error");
      setMsg("Upload Logo First");
      setStatus("failure");
      handleShow();
      topRef.current.scrollIntoView();
      return;
    }

    const data = {
      title: title,
      adress: adress,
      city: city,
      postalCode: postalCode,
      phone: phone,
      website: website,
      country: value.label,
      logo: logoPath,
      cover: coverPath,
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
            <div class="d-flex flex-row">
              <div class="p2" style={{ marginRight: 20 }}>
                <BackspaceRoundedIcon
                  style={{ fill: "#345DA7", cursor: "pointer" }}
                  onClick={() => history("/my-stores")}
                />
              </div>
              <div class="p2">
                <h1
                  style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
                >
                  Create Store
                </h1>
              </div>
            </div>
            {/* <i
              style={{ cursor: "pointer" }}
              onClick={() => history("/my-stores")}
              class="fas mb-5 fa-2x fa-arrow-left"
            ></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>Create Store</h1>
            </div> */}

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <div className="row">
                <div className="col">
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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

            <div className="mb-3">
              <form>
                <label
                  className="form-label"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  Store Logo
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="myLogo"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangeLogo}
                  required
                />
                {uploadPercentage > 0 && (
                  <ProgressBar
                    striped
                    now={uploadPercentage}
                    label={`${uploadPercentage}%`}
                  />
                )}
                <div style={{ marginTop: 5 }}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "15%",
                      backgroundColor: "#3B8AC4",
                      color: "#FFFFFF",
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                      fontWeight: 500,
                    }}
                    onClick={(e) => uploadLogo(e)}
                  >
                    Upload
                  </Button>
                </div>
                {/* {logoSrc !== "" ? (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: '2%' }}>
                    <img src={logoSrc} style={{ objectFit: 'cover', width: '80%' }} alt="" />
                  </div>
                ) : null} */}
              </form>
            </div>

            <div className="mb-3">
              <form>
                <label
                  className="form-label"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  Cover Photo
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="myCover"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangeCover}
                  required
                />
                {uploadPercentageTwo > 0 && (
                  <ProgressBar
                    striped
                    now={uploadPercentageTwo}
                    label={`${uploadPercentageTwo}%`}
                  />
                )}
                <div style={{ marginTop: 5 }}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "15%",
                      backgroundColor: "#3B8AC4",
                      color: "#FFFFFF",
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                      fontWeight: 500,
                    }}
                    onClick={(e) => uploadCover(e)}
                  >
                    Upload
                  </Button>
                </div>
                {/* {coverSrc !== "" ? (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: '2%' }}>
                    <img src={coverSrc} width="1200" height="400" alt="" />
                  </div>
                ) : null} */}
              </form>
            </div>

            <div className="mb-3" style={{ paddingTop: 25, fontWeight: "600" }}>
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
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
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
              <label
                className="form-label"
                style={{ color: "black", fontWeight: "600" }}
              >
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
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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
                  <label
                    className="form-label"
                    style={{ color: "black", fontWeight: "600" }}
                  >
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
                <label
                  className="form-label"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  Phone
                </label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangePhone}
                  required
                />
              </div>

              <div
                className="mb-3"
                style={{ paddingTop: 25, fontWeight: "600" }}
              >
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
            <Button
              variant="outlined"
              style={{
                width: "25%",
                backgroundColor: "#3B8AC4",
                color: "#FFFFFF",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                fontWeight: 500,
              }}
              onClick={(e) => addStores(e)}
              disabled={titleError !== null || title === ""}
            >
              Add Store
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStoresForm;
