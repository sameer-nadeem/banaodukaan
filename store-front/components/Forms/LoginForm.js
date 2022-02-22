import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Login.module.css";
import { login } from "../../actions/auth"
const LoginForm = () => {
  const [showError, setShowError] = useState(false)
  const [errorMsg, setError] = useState("")
  const dispatch = useDispatch()
  const loginLoading = useSelector(state => state.auth.loading)
  const [loginForm, setLoginForm] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const onLogin = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    if (loginForm.emailLogin === "" || loginForm.passwordLogin === "") {
      setError("Please enter your credentials")
      setShowError(true)
      return
    }

    dispatch(login(
      loginForm.emailLogin,
      loginForm.passwordLogin,
      { setShowError, setError }))
  };

  const onLoginChange = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setShowError(false)
  }, [loginForm])
  return (
    <>
    <div style={{marginTop: '9%', marginLeft: '5%'}}>
      <h2 className={styles.h2}>Login</h2>
    </div>
    <div className="card" style={{marginTop: '3%', marginLeft: '5%', borderRadius:'10px'}}>
      <div className={styles.cardInside}>
        
        <form className={styles.form}>
          <Alert style={{
            display: showError ? "" : "none"
          }}
            className="mb-3"
            severity={"error"}>
            {errorMsg}
          </Alert>
          <div className={styles.p}>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name='emailLogin'
              onChange={onLoginChange}
              value={loginForm.emailLogin}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label mt-3">
              Password
            </label>
            <input
              type="password"
              onChange={onLoginChange}
              className="form-control"
              id="exampleInputPassword1"
              name='passwordLogin'
              value={loginForm.passwordLogin}
            />
          </div>
          <button disabled={loginLoading} onClick={onLogin} className={`${styles.login} mt-3`} type="submit">
            {`Login`}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginForm
