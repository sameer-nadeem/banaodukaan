import Cookies from "universal-cookie";
const initialAuthState = {
  token: null,
  loading: true,
  isAuthenticated: false,
  user: null
}

export const authReducer = (state = initialAuthState, action) => {
  const cookies = new Cookies()
  switch (action.type) {
    // case "USER_LOADING":
    //   return { ...state, loading: true }
    case "AUTH_ERROR":
      // localStorage.removeItem('token')
      cookies.remove("token", { domain: ".banaodukaan.com" })
      return { token: null, isAuthenticated: false, loading: false, user: null }
    case "USER_LOADED":
      return { token: cookies.get('token'), loading: false, isAuthenticated: true, user: action.payload }
    default:
      return { ...state };
  }
}


