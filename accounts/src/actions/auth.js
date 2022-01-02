
export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST'
    })

    //make axios request and get token

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: "token" //replace this value with token fetched
    })

  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    })
  }
}
