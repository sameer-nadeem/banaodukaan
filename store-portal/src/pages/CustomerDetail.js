import { useState, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { uri } from '../api.json'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Alert from "../components/Alerts/Alert";
import JoditEditor from "jodit-react";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Button } from '@material-ui/core'

const CustomerDetail = () => {

    const { id: customerId } = useParams();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        if (alertType === 'success') {
            history.push("/admin/customers");
        }
    };

    const handleShow = () => setShow(true);
    //Alerts

    const [alertTitle, setAlertTitle] = useState('')
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')



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
    const [customer, setCustomer] = useState([]);



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

    // use effect to get customer from their id
    useEffect(() => {
        const getCustomerById = async (id) => {
            try {
                const res = await axios.get(`${uri}/customer/${id}`);
                let data = res.data.customer
                console.log("customer detail ", data)
                setCustomer(data)
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
        getCustomerById(customerId);
    }, [customerId]);


    // update customer function 
    const updateCustomer = async (event) => {
        event.preventDefault()

        if (email === '' || firstName === '' || lastName === '' || city === '' || address === '' || apartment === '' || postalCode === ''
            || phone === '' || country === undefined) {
            // add alert here
            // event.preventDefault();

            handleShow();
            setAlertTitle("Error")
            setAlertMessage("Please fill in all of the fields")
            setAlertType("failure")
            //setShow(true);
            return;
        }
        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            city: city,
            address: address,
            apartment: apartment,
            postalCode: postalCode,
            phone: phone,
            country: country.label,
        };
        console.log(data)

        try {
            await axios.put(`${uri}/customer/${customerId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            handleShow();
            setAlertTitle("Success")
            setAlertMessage("Customer updated successfully!")
            setAlertType("success")
            //setShow(true);
        }
        catch (err) {
            setAlertTitle("Error")
            setAlertMessage("Error occured, please try again later")
            setAlertType("failure")
            setShow(true);
        }
    }

    return (
        <div>
            <div>
                <Alert
                    title={alertTitle}
                    message={alertMessage}
                    show={show}
                    variant={alertType === "success" ? "success" : "failure"}
                    handleClose={handleClose}
                    handleShow={handleShow}
                />
            </div>
            <form style={{ paddingTop: 25 }}>
                <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
                    <div
                        className="card form-card"
                        style={{
                            padding: 40,
                            paddingTop: 25,
                            width: "85%",
                            backgroundColor: "white",
                        }}
                    >
                        <div class = "d-flex flex-row"> 
                            <div class="p2" style = {{marginRight: 20}}>
                                <BackspaceRoundedIcon style = {{fill: '#345DA7', cursor: 'pointer', }}  onClick={() => history.push('/admin/customers')} />
                            </div>
                            <div class="p2">
                                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Customer Detail</h1>
                            </div>
                        </div>
                        {/* <i style={{ cursor: "pointer" }} onClick={() => history.push('/admin/customers')} className="fas mb-5 fa-2x fa-arrow-left"></i> */}

                        {/* <div>
                            <h1 style={{ fontSize: 24, color: "black" }}>Customer Detail</h1>
                        </div> */}

                        <div className="mb-3" style={{ paddingTop: 25 }}>
                            <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                                Email
                            </label>
                            <input
                                className="form-control"
                                type="email"
                                style={{ backgroundColor: "white", color: "black" }}
                                value={email}
                                onChange={onChangeEmail}
                                required
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                                        First Name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        style={{ backgroundColor: "white", color: "black" }}
                                        value={firstName}
                                        onChange={onChangeFirstName}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                                        Last Name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        style={{ backgroundColor: "white", color: "black" }}
                                        value={lastName}
                                        onChange={onChangeLastName}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                                Phone Number
                            </label>
                            <input
                                className="form-control"
                                type="tel"
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
                        className="card form-card"
                        style={{
                            padding: 40,
                            paddingTop: 25,
                            width: "85%",
                            backgroundColor: "white",
                        }}
                    >
                        <div className="mb-3" style={{ paddingTop: 25 }}>
                            <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
                                Country/region
                            </label>
                            <Select options={options} value={country} onChange={onChangeCountry} placeholder={country} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" , fontWeight: '600'}}>
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
                                    <label className="form-label" style={{ color: "black" , fontWeight: '600'}}>
                                        City
                                    </label>
                                    <input
                                        className="form-control"

                                        style={{ backgroundColor: "white", color: "black" }}
                                        value={city}
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
                                        value={postalCode}
                                        onChange={onChangePostalCode}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            variant = "outlined"
                            style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                            onClick={(e) => updateCustomer(e)}
                        >
                            Update Customer
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CustomerDetail;
