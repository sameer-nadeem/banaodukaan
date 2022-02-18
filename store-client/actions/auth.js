import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import useURL from "../utils/useURL";
const url = useURL()
export const loadUser = () => async dispatch => {
  if (localStorage.customerToken) {
    setAuthToken()
  }
  try {
    const url = useURL()
    const res = await axios.get(`${url}:5000/api/auth/customer`)
    dispatch({
      type: "USER_LOADED",
      payload: res.data.customer
    })
    console.log(res.data.customer)
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR"
    })
  }
}

export const register = (
  { email,
    firstName,
    lastName,
    password
  },
  alertHandler
) => async dispatch => {
  try {
    dispatch({
      type: "REGISTER_REQUEST"
    })
    const { data } = await axios.post(`${url}:5000/api/auth/customer/register`,
      { email, firstName, lastName, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: data.token
    })
    dispatch(loadUser())
  } catch (err) {

    dispatch({
      type: 'REGISTER_FAIL'
    })

    const error = err.response.data.error
    if (error === "USER_ALREADY_EXIST") {
      alertHandler.setError("User with such email already exists")
      alertHandler.setShowError(true)
    }
    else {
      alertHandler.setError("Something went wrong")
      alertHandler.setShowError(true)
    }


  }
}


export const logout = () => async dispatch => {
  dispatch({
    type: "LOGOUT"
  })
}

export const login = (email, password, alertHandler, ref = null) => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST'
    })
    const body = {
      email,
      password,
    };
    const response = await axios.post(`${url}:5000/api/auth/customer`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.token //replace this value with token fetched
    })
    if (ref) {
      window.location.href = ref
      return
    }
    console.log(ref, "ref")

    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    })
    console.log(err.response.data)
    alertHandler.setError("Invalid credentials entered")
    alertHandler.setShowError(true)

  }
}

