import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alerts/Alert";
import countryList from "react-select-country-list";
import Select from "react-select";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Button } from '@material-ui/core'

const EditStoreForm = () => {
  const { id } = useParams();
  const [storeInfo, setStoreInfo] = useState({ settings: {} });

  useEffect(() => {
    const fetchStore = async () => {
      //gets the store which needs to be updated
      const { data } = await axios.get(`/api/merchant/store/${id}`); //id is from the store that was clicked on and extracted using useParams
      setStoreInfo(data.storeInfo);
    };
    fetchStore();
  }, [id]);

  useEffect(() => {
    //sets the states of the various variables of the form
    setTitle(storeInfo.title);
    setValue(storeInfo.settings.country);
    setCity(storeInfo.settings.city);
    console.log("city is city", storeInfo.settings.country);
    setPostalCode(storeInfo.settings.postalCode);
    setPhone(storeInfo.settings.phone);
    setWebsite(storeInfo.settings.website);
    setApartment(storeInfo.settings.apartment);
    setAdress(storeInfo.settings.localPickupAddress);
  }, [storeInfo]);

  const [show, setShow] = useState(false);
  const history = useNavigate();
  const handleClose = () => {
    setShow(false);
    history("/my-stores");
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
    console.log(value);
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
  //function to update store information
  const updateStore = async (event) => {
    //preventing the default behavior of onsubmit function
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
    //put request to update store info
    try {
      await axios.put(`/api/merchant/store/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow(); //display alert if successful
    } catch (err) {
      console.log(err);
    }
  };
  //rendering the actual form and the relevant fields
  return (
    <div>
      <Alert
        title="Store Updated"
        message="The Store was succesfuly updated"
        show={show}
        variant="success"
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
            <div class = "d-flex flex-row"> 
              <div class="p2" style = {{marginRight: 20}}>
                <BackspaceRoundedIcon style = {{fill: '#345DA7', cursor: 'pointer', }}  onClick={() => history('/my-stores')} />
              </div>
              <div class="p2">
                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Edit Store</h1>
              </div>
            </div>
            {/* <i
              style={{ cursor: "pointer" }}
              onClick={() => history("/my-stores")}
              className="fas mb-5 fa-2x fa-arrow-left"
            ></i>
            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>Edit Store</h1>
            </div> */}

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                Title
              </label>
              <input
                className="form-control"
                disabled
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeTitle}
                value={title}
                required
              />
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" , fontWeight: '600'}}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                    First name
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                    Last name
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                Address
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                onChange={onChangeAdress}
                value={adress}
                required
              />
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                    City
                  </label>
                  <input
                    className="form-control"
                    value={city}
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeCity}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                    Postal code
                  </label>
                  <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangePostalCode}
                    required
                    value={postalCode}
                  />
                </div>
              </div>
              <div className="mb-3" style={{ paddingTop: 25 }}>
                <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                  Phone
                </label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangePhone}
                  required
                  value={phone}
                />
              </div>

              <div className="mb-3" style={{ paddingTop: 25 }}>
                <label className="form-label" style={{ color: "black" , fontWeight: '600'}}>
                  Business or personal website(optional)
                </label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "white", color: "black" }}
                  onChange={onChangeWebsite}
                  required
                  value={website}
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
              variant = "outlined"
              style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
              onClick={(e) => updateStore(e)}
            >
              Update Store
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStoreForm;
