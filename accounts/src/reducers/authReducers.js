import Cookies from "universal-cookie";
const initialAuthState = {
  token: null,
  loading: false,
  isAuthenticated: false
}

export const authReducer = (state = initialAuthState, action) => {
  const cookies = new Cookies()
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload)
      cookies.set("token", action.payload, { domain: "bdstaging.com" })
      return { token: action.payload, isAuthenticated: true, loading: false }
    case 'LOGIN_FAIL':
      localStorage.removeItem('token')
      cookies.remove("token")
      return { token: null, isAuthenticated: false, loading: false }
    default:
      return { ...state };
  }
}


