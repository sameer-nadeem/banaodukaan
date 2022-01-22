import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment, IconButton } from "@material-ui/core";
import TextField from "@mui/material/TextField";

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

  const updateProfile = async (event) => {
    event.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: address,
    };

    console.log(data);

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

  const changePassword = async (event) => {
    event.preventDefault();
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
    } else if (newPassword.length < 8 || confirmNewPassword.length < 8) {
      handleShow();
      setTitle("Error");
      setMsg("Length of password should be more than or equal to 8 characters");
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
        setMsg("Old Password does not match with the one stored in database");
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
            <i
              style={{ cursor: "pointer" }}
              onClick={() => history("/my-stores")}
              class="fas mb-5 fa-2x fa-arrow-left"
            ></i>

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
            <div
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <button
                className="btn btn-success"
                style={{ width: "25%" }}
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
              <button
                className="btn btn-success"
                style={{ width: "25%" }}
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
