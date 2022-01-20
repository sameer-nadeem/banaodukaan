import { useState, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { uri } from '../api.json'
import Select from 'react-select'
import countryList from 'react-select-country-list'

const CustomerDetail = () => {

    const { id: customerId } = useParams();

    const options = useMemo(() => countryList().getData(), [])
    const [country, setCountry] = useState("")
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState(0);
    const [apartment, setApartment] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState(0);

    const history = useHistory();
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const onChangePhone = (event) => {
        setPhone(event.target.value);
    };
    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    };
    const onChangeCountry = (value) => {
        setCountry(value);
    };
    const onChangePostalCode = (event) => {
        setPostalCode(event.target.value);
    };
    const onChangeApartment = (event) => {
        setApartment(event.target.value);
    };
    const onChangeCity = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        const getBrandById = async (id) => {
          try {
            const res = await axios.get(`${uri}/customer/${id}`);
            let data = res.data.customer
            console.log("customer detail ", data)
            setCity(data.city)
            setAddress(data.address)
            setApartment(data.apartment)
            setPhone(data.phone)
            setPostalCode(data.postalCode)
            setCountry(data.country)
            setEmail(data.userId.email)
            setFirstName(data.userId.firstName)
            setLastName(data.userId.lastName)
          } catch (err) {
            console.log(err);
          }
        };
        getBrandById(customerId);
      }, [customerId]);

    return (
        <div>
        <form style={{ paddingTop: 25 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <div
                class="card"
                style={{
                padding: 40,
                paddingTop: 25,
                width: "85%",
                backgroundColor: "white",
                }}
            >
                <div>
                <h1 style={{ fontSize: 24, color: "black" }}>Add Customers</h1>
                </div>

                <div class="mb-3" style={{ paddingTop: 25 }}>
                <label class="form-label" style={{ color: "black" }}>
                    Email
                </label>
                <input
                    class="form-control"
                    type = "email"
                    style={{ backgroundColor: "white", color: "black" }}
                    value = {email}
                    onChange={onChangeEmail}
                    required
                />
                </div>
                <div class="row">
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        First Name
                    </label>
                    <input
                        class="form-control"
                        type="text"
                        style={{ backgroundColor: "white", color: "black" }}
                        value = {firstName}
                        onChange={onChangeFirstName}
                        required
                    />
                    </div>
                </div>
                <div class="col">
                    <div class="mb-3">
                    <label class="form-label" style={{ color: "black" }}>
                        Last Name
                    </label>
                    <input
                        class="form-control"
                        type="text"
                        style={{ backgroundColor: "white", color: "black" }}
                        value = {lastName}
                        onChange={onChangeLastName}
                        required
                    />
                    </div>
                </div>
                </div>
                <div class="mb-3">
                <label class="form-label" style={{ color: "black" }}>
                    Phone Number
                </label>
                <input
                    class="form-control"
                    type = "tel"
                    style={{ backgroundColor: "white", color: "black" }}
                    value={phone}
                    onChange={onChangePhone}
                    required
                />
                </div>
            </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <div
                class="card"
                style={{
                padding: 40,
                paddingTop: 25,
                width: "85%",
                backgroundColor: "white",
                }}
            >
                <div className="mb-3" style={{ paddingTop: 25 }}>
                    <label className="form-label" style={{ color: "black" }}>
                        Country/region
                    </label>
                    <Select options={options} value={country} onChange={onChangeCountry} placeholder = {country} />
                </div>

                <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                    Address
                </label>
                <input
                    className="form-control"
                    style={{ backgroundColor: "white", color: "black" }}
                    onChange={onChangeAddress}
                    value={address}
                    required
                />
                </div>
                
                
                <div className="mb-3">
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
                            value = {city}
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
                            value = {postalCode}
                            onChange={onChangePostalCode}
                            required
                        />
                        </div>
                    </div>
                </div>

                <button
                class="btn btn-success"
                style={{ width: "25%",}}
                // onClick={}
                >
                    Add Customer
                </button>
            </div>
            </div>
        </form>
        </div>
    )
};

export default CustomerDetail;