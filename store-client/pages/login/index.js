import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import useURL from "../../utils/useURL";
export default function Login() {
  const [loginForm, setLoginForm] = useState({
    emailLogin: "",
    passwordLogin: "",
  });

  const [registerForm, setRegisterForm] = useState({
    emailRegister: "",
    passwordRegister: "",
    passwordRegister2: "",
    fullName: ""
  })

  const uri = useURL()
  console.log(uri)

  const onRegister = async (e) => {
    e.preventDefault()
    console.log(registerForm)
    try {
      const { data } = await axios.post(`${uri}:5000/api/auth/customer/register`,
        {
          email: registerForm.emailRegister,
          fullName: registerForm.fullName,
          password: registerForm.passwordRegister
        })

      console.log(data)
      localStorage.setItem("customerToken", data.token)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    //api call
    try {
      const { data } = await axios.post(`${uri}:5000/api/auth/customer`,
        {
          email: loginForm.emailLogin,
          password: loginForm.passwordLogin
        }
      )
      console.log(data)
      localStorage.setItem("customerToken", data.token)
    }
    catch (err) {
      console.log(err.response.data)
    }
  };

  const onLoginChange = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="row d-flex align-items-center justify-content-evenly"
    >
      <div className="col-md-5 col-sm-12">
        <h2>Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              onChange={onLoginChange}
              value={loginForm.emailLogin}
              name="emailLogin"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="passwordLogin"
              value={loginForm.passwordLogin}
              className="form-control"
              onChange={onLoginChange}
            />
          </div>
          <button type="submit" onClick={onLogin} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      <div className="col-md-5 col-sm-12">
        <h2>Register</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={registerForm.fullName}
              onChange={onRegisterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="emailRegister"
              value={registerForm.emailRegister}
              onChange={onRegisterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="passwordRegister"
              className="form-control"
              value={registerForm.passwordRegister}
              onChange={onRegisterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="passwordRegister2"
              value=""
              className="form-control"
              value={registerForm.passwordRegister2}
              onChange={onRegisterChange}
            />
          </div>
          <button onClick={onRegister} type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
