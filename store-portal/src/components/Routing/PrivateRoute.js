import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Accounts from "./Accounts";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    console.log(auth.isAuthenticated, auth.loading)
  }, [auth])
  return (< Route
    {...rest}
    render={props =>
      auth.loading ? <></> :
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <h1>Accounts</h1>)
    }
  />)
}


export default PrivateRoute
