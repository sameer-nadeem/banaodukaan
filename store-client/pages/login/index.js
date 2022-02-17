import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import useURL from "../../utils/useURL";
import { login, register } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router'
// export default function Login() {
//   const [loginForm, setLoginForm] = useState({
//     emailLogin: "",
//     passwordLogin: "",
//   });

//   const [registerForm, setRegisterForm] = useState({
//     emailRegister: "",
//     passwordRegister: "",
//     passwordRegister2: "",
//     fullName: ""
//   })

//   const uri = useURL()
//   console.log(uri)

//   const onRegister = async (e) => {
//     e.preventDefault()
//     console.log(registerForm)
//     try {
//       const { data } = await axios.post(`${uri}:5000/api/auth/customer/register`,
//         {
//           email: registerForm.emailRegister,
//           fullName: registerForm.fullName,
//           password: registerForm.passwordRegister
//         })

//       console.log(data)
//       localStorage.setItem("customerToken", data.token)
//     } catch (err) {
//       console.log(err.response.data)
//     }
//   }

//   const onLogin = async (e) => {
//     e.preventDefault();
//     console.log(loginForm);
//     //api call
//     try {
//       const { data } = await axios.post(`${uri}:5000/api/auth/customer`,
//         {
//           email: loginForm.emailLogin,
//           password: loginForm.passwordLogin
//         }
//       )
//       console.log(data)
//       localStorage.setItem("customerToken", data.token)
//     }
//     catch (err) {
//       console.log(err.response.data)
//     }
//   };

//   const onLoginChange = (e) => {
//     setLoginForm((prevState) => {
//       return {
//         ...prevState,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };
//   const onRegisterChange = (e) => {
//     setRegisterForm({
//       ...registerForm,
//       [e.target.name]: e.target.value
//     })
//   }
//   return (
//     <div
//       style={{ height: "100vh", width: "100%" }}
//       className="row d-flex align-items-center justify-content-evenly"
//     >
//       <div className="col-md-5 col-sm-12">
//         <h2>Login</h2>
//         <form>
//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               onChange={onLoginChange}
//               value={loginForm.emailLogin}
//               name="emailLogin"
//               className="form-control"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="passwordLogin"
//               value={loginForm.passwordLogin}
//               className="form-control"
//               onChange={onLoginChange}
//             />
//           </div>
//           <button type="submit" onClick={onLogin} className="btn btn-primary">
//             Login
//           </button>
//         </form>
//       </div>
//       <div className="col-md-5 col-sm-12">
//         <h2>Register</h2>
//         <form>
//           <div className="mb-3">
//             <label className="form-label">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               className="form-control"
//               value={registerForm.fullName}
//               onChange={onRegisterChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               name="emailRegister"
//               value={registerForm.emailRegister}
//               onChange={onRegisterChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="passwordRegister"
//               className="form-control"
//               value={registerForm.passwordRegister}
//               onChange={onRegisterChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               name="passwordRegister2"
//               value=""
//               className="form-control"
//               value={registerForm.passwordRegister2}
//               onChange={onRegisterChange}
//             />
//           </div>
//           <button onClick={onRegister} type="submit" className="btn btn-primary">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

export default function Login() {
  const loginLoading = useSelector(state => state.auth.loading)
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const router = useRouter()
  useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth])
  const [showError, setShowError] = useState(false)
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
  const dispatch = useDispatch()
  const uri = useURL()
  console.log(uri)

  const onRegister = async (e) => {
    e.preventDefault()
    console.log(registerForm)
    dispatch(register({
      email: registerForm.emailRegister,
      firstName: registerForm.fullName,
      lastName: "",
      password: registerForm.passwordRegister
    }, { setShowError }))
  }

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(loginForm);

    dispatch(login(
      loginForm.emailLogin,
      loginForm.passwordLogin
      , { setShowError }))
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
    <div className>
      <div>
        <div className="cartsy-page-thumb-area">
          <img
            className={styles.img}
            src="https://d1rn6kzjmi8824.cloudfront.net/wp-content/uploads/sites/4/2020/09/01125810/my-account.jpg"
            alt="Shop"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className={styles.cardInside}>
              <h2 className={styles.h2}>Login</h2>
              <form className={styles.form}>
                <Alert style={{
                  display: showError ? "" : "none"
                }}
                  className="mb-3"
                  severity={"error"}>
                  {"Invalid credentials"}
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
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <button disabled={loginLoading} onClick={onLogin} className={styles.login} type="submit">
                  {`Login`}
                </button>
                <p className="woocommerce-LostPassword lost_password">
                  <a href="https://cartsy.redq.io/furniture/my-account/lost-password/">
                    Lost your password?
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className={styles.cardInside}>
              <h2 className={styles.h2}>Register</h2>
              <form className={styles.form}>
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
        </div>
      </div>
    </div>
  )
}
