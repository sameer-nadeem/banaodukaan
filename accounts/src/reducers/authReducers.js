
const initialAuthState = {
  token: null,
  loading: false,
  isAuthenticated: false
}

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload)
      return { token: action.payload, isAuthenticated: true, loading: false }
    case 'LOGIN_FAIL':
      localStorage.removeItem('token')
      return { token: null, isAuthenticated: false, loading: false }
    default:
      return state;
  }
}


