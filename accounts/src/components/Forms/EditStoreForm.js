import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alerts/Alert";
import countryList from 'react-select-country-list'
import Select from 'react-select'

const EditStoreForm = () => {
  const { id } = useParams()
  const [storeInfo, setStoreInfo] = useState({ settings: {} })

  useEffect(() => {
    const fetchStore = async () => {
      const { data } = await axios.get(`/api/merchant/store/${id}`)
      setStoreInfo(data.storeInfo)
    }
    fetchStore()
  }, [id])

  useEffect(() => {
    setTitle(storeInfo.title)
    setValue(storeInfo.settings.country)
    setCity(storeInfo.settings.city)
    console.log("city is city", storeInfo.settings.country)
    setPostalCode(storeInfo.settings.postalCode)
    setPhone(storeInfo.settings.phone)
    setWebsite(storeInfo.settings.website)
    setApartment(storeInfo.settings.apartment)
    setAdress(storeInfo.settings.localPickupAddress)

  }, [storeInfo])

  const [show, setShow] = useState(false);
  const history = useNavigate();
  const handleClose = () => {
    setShow(false);
    history("/my-stores");
  };
  const handleShow = () => setShow(true);
  //success modal states end

  const options = useMemo(() => countryList().getData(), [])
  const [title, setTitle] = useState("");
  const [value, setValue] = useState('')
  const [adress, setAdress] = useState("");

  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [phone, setPhone] = useState(0);
  const [website, setWebsite] = useState("");
  const [apartment, setApartment] = useState("")



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
    setValue(value)
    console.log(value)
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


  const updateStore = async (event) => {

    event.preventDefault()

    const data = {
      title: title,
      adress: adress,
      city: city,
      postalCode: postalCode,
      phone: phone,
      website: website,
      country: value.label
    };


    console.log(data)

    try {
      await axios.put(`/api/merchant/store/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
    } catch (err) {
      console.log(err);
    }
  };


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
            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>Edit Store</h1>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
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
              <label className="form-label" style={{ color: "black" }}>
                Country/region
              </label>
              <Select options={options} value={value} onChange={onChangeCountry} />
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
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
                  <label className="form-label" style={{ color: "black" }}>
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
              <label className="form-label" style={{ color: "black" }}>
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
                    value={city}
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
                    value={postalCode}
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
                  value={phone}
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

            <button
              className="btn btn-success"
              style={{ width: "25%" }}
              onClick={(e) => updateStore(e)}
            >
              Update Store
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStoreForm;
