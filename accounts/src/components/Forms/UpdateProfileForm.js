import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment, IconButton } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { Button } from '@material-ui/core'

const UpdateProfileForm = () => {
  //success modal
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const handleClose = () => {
    setShow(false);
    // history("/");
  };
  const handleShow = () => setShow(true);
  //success modal states end
  //states for all the relevant fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //onchange functions
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

  const onChangeConfirmPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleMouseDownOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  //getting the merchant profile and setting the states of variables
  const getProfile = async () => {
    try {
      const res = await axios.get(`/api/merchant/profile`, {});
      setFirstName(res.data.merchant.firstName);
      setLastName(res.data.merchant.lastName);
      setAddress(res.data.merchant.email);
      setHashedPassword(res.data.merchant.password);
    } catch (err) {
      console.log(err);
    }
  };
  //function to update profile
  const updateProfile = async (event) => {
    event.preventDefault();
    //checking whether email address matches specified format
    if (!address.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setTitle("Invalid Email");
      setMsg("Incorrect format of email address");
      setStatus("failure");
      handleShow();
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: address,
    };

    console.log(data);
    //put request
    try {
      await axios.put(`/api/merchant/profile`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleShow();
      setTitle("Profile Updated");
      setMsg("Profile Details Updated Successfully!");
      setStatus("success");
    } catch (err) {
      console.log(err);
    }
  };
  //function to change passowrd
  const changePassword = async (event) => {
    event.preventDefault();
    //various cases for input validation, matching format of password as well using regex
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      handleShow();
      setTitle("Error");
      setMsg("Password field(s) must not be left empty");
      setStatus("failure");
    } else if (newPassword !== confirmNewPassword) {
      handleShow();
      setTitle("Error");
      setMsg("New passwords entered do not match");
      setStatus("failure");
    } else if (
      !newPassword.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ) ||
      !confirmNewPassword.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      handleShow();
      setTitle("Password Error");
      setMsg(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
      setStatus("failure");
    } else {
      const data = {
        password: oldPassword,
        newPassword: newPassword,
      };

      console.log(data);

      try {
        await axios.put(`/api/merchant/password`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleShow();
        setTitle("Password Changed");
        setMsg("Password changed successfully!");
        setStatus("success");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        // history('/')
      } catch (err) {
        console.log(err);
        handleShow();
        setTitle("Error");
        setMsg("Old Password does not match with the one stored in database"); //in case the old password does not match new password
        setStatus("failure");
      }
    }
  };
  useEffect(() => {
    //Runs only on the first render
    getProfile();
  }, []);

  return (
    <div>
      <Alert
        title={title}
        message={msg}
        show={show}
        variant={status === "success" ? "success" : "failure"}
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
                <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Profile</h1>
              </div>
            </div>
            
            {/* <i
              style={{ cursor: "pointer" }}
              onClick={() => history("/my-stores")}
              class="fas mb-5 fa-2x fa-arrow-left"
            ></i>

            <div>
              <h1 style={{ fontSize: 24, color: "black" }}>Profile</h1>
            </div> */}

            <div className="row" style = {{paddingTop: 25}}>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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
                  <label className="form-label" style={{ color: "black", fontWeight: '600' }}>
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

            <div className="mb-3" style={{ }}>
              <label className="form-label" style={{ color: "black" , fontWeight: '600'}}>
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
            <div
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                variant = "outlined"
                style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                onClick={(e) => updateProfile(e)}
              >
                Update Profile
              </Button>
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
              <h1 style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>Security</h1>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <TextField
                    onChange={onChangeOldPassword}
                    value={oldPassword}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Current Password"
                    id="password"
                    autoComplete="current-password"
                    type={showOldPassword ? "text" : "password"}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <TextField
                    onChange={onChangeNewPassword}
                    value={newPassword}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    id="password"
                    autoComplete="current-password"
                    type={showNewPassword ? "text" : "password"}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <TextField
                    onChange={onChangeConfirmPassword}
                    value={confirmNewPassword}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm New Password"
                    id="password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
            <div
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                variant = "outlined"
                style={{ width: "25%", backgroundColor: "#3B8AC4", color: "#FFFFFF", boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', fontWeight: 500 }}
                onClick={(e) => changePassword(e)}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
