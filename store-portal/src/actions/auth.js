import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
  setAuthToken()
  try {
    // dispatch({
    //   type: "USER_LOADING"
    // })
    const res = await axios.get(`/api/auth/store`)
    dispatch({
      type: "USER_LOADED",
      payload: res.data.merchant
    })
    console.log(res.data.merchant)
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: "AUTH_ERROR"
    })
  }
}
