import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../../actions/auth";
import useQuery from "../../utils/useQuery";

const LoginForm = () => {
  //variables and their states for the login form
  const [email, setEmail] = useState(""); //to store and keep track of the email entered
  const [password, setPassword] = useState(""); //to store and keep track of the password entered
  // show password implemented using the below variable and functions
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const [authError, setAuthError] = useState(null);
  const loginLoading = useSelector((state) => state.auth.loading);
  const [show, setShow] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  //appropriate onchange functions
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

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

  //for successful google login button click
  const responseSuccessGoogle = async (res) => {
    let tokenId = res.tokenId;
    dispatch(
      loginGoogle(tokenId, history, {
        setAlertTitle,
        setAlertVariant,
        setAlertMessage,
      })
    );
  };

  // for error after clicking on google button
  const responseErrorGoogle = (res) => {
    // setAlertTitle("Error")
    // setAlertMessage("Please try again later")
    // setAlertVariant("failure")
    // handleShow();
    console.log(res);
  };

  // handle submit function
  const handleSubmit = async (event) => {
    // we can simple get the values from the variables
    event.preventDefault();
    //checking for correct format of email
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setAlertTitle("Invalid Email");
      setAlertMessage("Incorrect format of email address");
      setAlertVariant("failure");
      handleShow();
      return;
    }
    //dispatching login action
    dispatch(
      login(
        email,
        password,
        history,
        {
          setAlertMessage,
          setAlertTitle,
          setAlertVariant,
          handleShow,
          setAuthError,
        },
        query.get("ref")
      )
    );
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  //rendering the form
  return (
    <div>
      <Alert
        title={alertTitle}
        message={alertMessage}
        show={show}
        variant={alertVariant}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {/* form starts here */}
      <span className="text-danger" style={{ fontWeight: "bold" }}>
        {authError && authError}
      </span>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          onChange={onChangeEmail}
          value={email}
          margin="normal"
          required
          error={authError !== null}
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          onChange={onChangePassword}
          value={password}
          margin="normal"
          required
          error={authError !== null}
          fullWidth
          name="password"
          label="Password"
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
        <div style={{ marginTop: 15 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#345DA7",
              color: "white",
              height: 55,
              fontWeight: "500",
            }}
            disabled={loginLoading}
          >
            {!loginLoading && `Log In`}
            {loginLoading && (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </Button>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <GoogleLogin
              clientId="1008574452559-sik3r2dpsclo9unv6tkv5n9lfjvdhn4c.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <GoogleButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{ width: "100%", borderRadius: 4, textIndent: -40 }}
                >
                  Log in with Google
                </GoogleButton>
              )}
            />
          </div>
        </div>

        <div style={{ marginTop: 15, marginBottom: 60 }}>
          <Grid container>
            <Grid item xs>
              <Link
                to="#"
                variant="body2"
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: "1.5rem",
                  color: "#3B8AC4",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
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
                {"New to BanaoDukaan? "}
                <Link to="/signup" variant="body2" style={{ color: "#3B8AC4" }}>
                  Get Started
                </Link>
              </h3>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default LoginForm;
