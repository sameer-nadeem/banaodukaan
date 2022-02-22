import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Login.module.css";
import { register } from '../../actions/auth';
const RegisterForm = () => {
  const [showError, setShowError] = useState(false)
  const [errorMsg, setError] = useState("")
  const loginLoading = useSelector(state => state.auth.loading)

  const [registerForm, setRegisterForm] = useState({
    emailRegister: "",
    passwordRegister: "",
    passwordRegister2: "",
    fullName: ""
  })
  const dispatch = useDispatch()
  const emptyFields = () => {
    return registerForm.emailRegister === "" || registerForm.fullName === "" || registerForm.passwordRegister === "" || registerForm.passwordRegister2 === ""
  }
  const checkPasswords = () => {
    return registerForm.passwordRegister === registerForm.passwordRegister2
  }
  const onRegister = async (e) => {
    e.preventDefault()
    console.log(registerForm)
    if (emptyFields()) {
      setError("Please fill the missing fields")
      setShowError(true)
      return
    }
    if (!checkPasswords()) {
      setError("Passwords don't match")
      setShowError(true)
      return
    }
    dispatch(register({
      email: registerForm.emailRegister,
      firstName: registerForm.fullName,
      lastName: "",
      password: registerForm.passwordRegister
    }, { setShowError, setError }))
  }


  const onRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {
    setShowError(false)
  }, [registerForm])
  return (
    <>
    <div style={{marginTop: '9%', marginLeft: '5%'}}>
      <h2 className={styles.h2}>Register</h2>
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
            <div className="col">
              <label className="form-label">Full Name</label>
              <input type="text"
                className="form-control"
                onChange={onRegisterChange}
                value={registerForm.fullName}
                name='fullName'></input>
            </div>
            <label htmlFor="exampleInputEmail1" className="form-label mt-3">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={registerForm.emailRegister}
              onChange={onRegisterChange}
              aria-describedby="emailHelp"
              name='emailRegister'
            />

            <div id="emailHelp" className="form-text"></div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label mt-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={registerForm.passwordRegister}
                onChange={onRegisterChange}
                name='passwordRegister'
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label mt-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name='passwordRegister2'
                onChange={onRegisterChange}
                value={registerForm.passwordRegister2}
              />
            </div>
          </div>
          <div className="mt-3" style={{ marginTop: "10%" }}></div>
          <button disabled={loginLoading} onClick={onRegister} className={styles.login} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
    </>

  )
}

export default RegisterForm
