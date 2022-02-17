const initialAuthState = {
  token: null,
  loading: false,
  isAuthenticated: false,
  user: null
}

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload, isAuthenticated: true, loading: false }
    case "LOGOUT":
    case "AUTH_ERROR":
    case "REGISTER_FAIL":
    case 'LOGIN_FAIL':
      localStorage.removeItem('token')
      return { token: null, isAuthenticated: false, loading: false, user: null }
    case "USER_LOADED":
      return { ...state, user: action.payload }
    default:
      return { ...state };
  }
}


