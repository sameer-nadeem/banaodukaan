import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import { register } from "../../actions/auth";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  //variables and their states
  const [email, setEmail] = useState(""); //to store and keep track of the email entered
  const [password, setPassword] = useState(""); //to store and keep track of the password entered
  const [confirmPassword, setConfirmPassword] = useState(""); // to store and keep track of the confirm password field
  const [firstName, setFirstName] = useState(""); // to store and keep track of the firstname
  const [lastName, setLastName] = useState(""); // to store and keep track of the last name
  const history = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onChangePassword = (e) => {
    //on change password function -> to update password variable
    setPassword((state) => {
      console.log(e.target.value);
      return e.target.value;
    });
  };

  const onChangeEmail = (e) => {
    // to update email variable
    setEmail((state) => {
      console.log(e.target.value);
      return e.target.value;
    });
  };

  const onChangeConfirmPassword = (e) => {
    //on change password function -> to update password variable
    setConfirmPassword((state) => {
      console.log(e.target.value);
      return e.target.value;
    });
  };

  const onChangeFirstName = (e) => {
    // to update email variable
    setFirstName((state) => {
      console.log(e.target.value);
      return e.target.value;
    });
  };
  const onChangeLastName = (e) => {
    //on change password function -> to update password variable
    setLastName((state) => {
      console.log(e.target.value);
      return e.target.value;
    });
  };

  // handle submit function
  //input validation done as well, corner cases catered
  //regex used
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      //add alert here
      setAlertTitle("Error");
      setAlertMessage("Passwords dont match!");
      setAlertVariant("failure");
      handleShow();
      console.log("passwords dont match");
      return;
    } else if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ) ||
      !confirmPassword.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      //add alert here
      setAlertTitle("Password Error");
      setAlertMessage(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
      setAlertVariant("failure");
      handleShow();
      return;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setAlertTitle("Invalid Email");
      setAlertMessage("Incorrect format of email address");
      setAlertVariant("failure");
      handleShow();
      return;
    }

    // try {
    //both passwords match then send to backend

    const body = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    dispatch(
      register(
        body,
        { setAlertMessage, setAlertTitle, setAlertVariant, handleShow },
        history
      )
    );

    // const response = await axios.post(`/api/auth/register-merchant`, body, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log("success: ", response);
    // Cookies.set(response.data.id, response.data.token);
    // history(`/my-stores`);
    // } catch {
    //   setAlertTitle("Error")
    //   setAlertMessage("Please try again later")
    //   setAlertVariant("failure")
    //   handleShow();
    //   console.log("error-whoops");
    // }
  };

  const [show, setShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Alert added here */}
      <Alert
        title={alertTitle}
        message={alertMessage}
        show={show}
        variant={alertVariant}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {/* form starts here */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <div>
          <TextField
            onChange={onChangeEmail}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={onChangeFirstName}
            value={firstName}
            margin="normal"
            required
            name="First name"
            label="First name"
            id="First name"
            autoComplete="First name"
          />
          <TextField
            onChange={onChangeLastName}
            value={lastName}
            margin="normal"
            required
            name="Last name"
            label="Last name"
            id="Last name"
            autoComplete="Last name"
          />
          <TextField
            onChange={onChangePassword}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
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
          <TextField
            onChange={onChangeConfirmPassword}
            value={confirmPassword}
            margin="normal"
            required
            fullWidth
            name="Confirm new password"
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
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

        <div style={{ marginTop: 15 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#345DA7",
              color: "white",
              height: 60,
              fontWeight: "500",
            }}
          >
            Create BanaoDukaan ID
          </Button>
        </div>

        <div style={{ marginTop: 15, marginBottom: 60 }}>
          <Grid container>
            <Grid item>
              <h3
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: "1.5rem",
                  color: "#454f5b",
                }}
              >
                {"Already have an account? "}
                <Link to="/" variant="body2" style={{ color: "#3B8AC4" }}>
                  Login
                </Link>
              </h3>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default SignUpForm;
