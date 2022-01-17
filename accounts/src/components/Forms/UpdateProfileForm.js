import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";


const UpdateProfileForm = () => {
  //success modal
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const handleClose = () => {
    setShow(false);
    history("/");
  };
  const handleShow = () => setShow(true);
  //success modal states end

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const onChangeOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(`/api/merchant/profile`, {
      });
      setFirstName(res.data.merchant.firstName)
      setLastName(res.data.merchant.lastName)
      setAddress(res.data.merchant.email)
      setHashedPassword(res.data.merchant.password)
    } catch (err) {
      console.log(err);
    }
  }

  const updateProfile = async (event) => {

    event.preventDefault()

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: address
    };


    console.log(data)

    try {
      await axios.put(`/api/merchant/profile`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
    } catch (err) {
      console.log(err);
    }

  };

  const changePassword = async (event) => {

    event.preventDefault()


    const data = {
      // title: title,
      // address: address,
      // city: city,
      // postalCode: postalCode,
      // phone: phone,
      // website: website,
      // country: value.label
    };


    console.log(data)

    try {
      await axios.post(`/api/merchant/store`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
    } catch (err) {
      console.log(err);
    }

  };
  useEffect(() => {
    //Runs only on the first render
    getProfile();
  }, []);

  return (
    <div>

<Alert
        title="Profile Updated"
        message="Profile Details Updated Successfully!"
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
              <h1 style={{ fontSize: 24, color: "black" }}>Profile</h1>
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
                    onChange={onChangeFirstName}
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
                    onChange={onChangeLastName}
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3" style={{ paddingTop: 25 }}>
              <label className="form-label" style={{ color: "black" }}>
                Email Address
              </label>
              <input
                className="form-control"
                style={{ backgroundColor: "white", color: "black" }}
                value={address}
                onChange={onChangeAddress}
                required
              />
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
            <div style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <button
              className="btn btn-success"
              style={{ width: "25%"}}
              onClick={(e) => updateProfile(e)}
            >
              Update Profile
            </button>
            </div>
            
          </div>
        </div>
      </form>
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
              <h1 style={{ fontSize: 24, color: "black" }}>Security</h1>
            </div>


            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Current Password
                  </label>
                  <input
                    className="form-control"
                    onChange={onChangeOldPassword}
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    New Password
                  </label>
                  <input
                    className="form-control"
                    onChange={onChangeNewPassword}
                    style={{ backgroundColor: "white", color: "black" }}
                    required
                  />
                </div>
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
            <div style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <button
              className="btn btn-success"
              style={{ width: "25%"}}
              onClick={(e) => changePassword(e)}
            >
              Change Password
            </button>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
