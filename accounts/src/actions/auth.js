import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken()
  }
  try {
    const res = await axios.get(`/api/auth`)
    dispatch({
      type: "USER_LOADED",
      payload: res.data.merchant
    })
    console.log(res.data.merchant)
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR"
    })
  }
}

export const logout = () => async dispatch => {
  dispatch({
    type: "LOGOUT"
  })
}

export const login = (email, password, history, alertHandler) => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST'
    })
    const body = {
      email,
      password,
    };
    const response = await axios.post(`/api/auth/login-merchant`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.token //replace this value with token fetched
    })
    dispatch(loadUser())
    history(`/my-stores`);
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    })
    alertHandler.setAlertTitle("Error")
    alertHandler.setAlertMessage("Please try again later")
    alertHandler.setAlertVariant("failure")
    alertHandler.handleShow();
    console.log("error", err);
  }
}


export const loginGoogle = (tokenId, history, alertHandler) => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST'
    })
    const body = {
      tokenId: tokenId,
    };
    const response = await axios.post(
      `/api/auth/google-login-merchant`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.token //replace this value with token fetched
    })
    dispatch(loadUser())

    history(`/my-stores`);
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    })
    alertHandler.setAlertTitle("Error")
    alertHandler.setAlertMessage("Please try again later")
    alertHandler.setAlertVariant("failure")
    alertHandler.handleShow();
    console.log("error", err);
  }
}
