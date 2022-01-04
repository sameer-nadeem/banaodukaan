import { Button, TextField } from "@mui/material"
import { useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Stores from "./components/Stores";
import AddStores from "./components/Forms/AddStores";

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path = "/signup" element= {<SignUp/>} />
        <Route path = "/my-stores" element = {<Stores/>} />
        <Route path = "/my-stores/new" element = {<AddStores/>} />
      </Routes>
    </Router>
  );
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const onChangePassword = (e) => {
  //   setPassword(state => {
  //     console.log(e.target.value)
  //     return e.target.value
  //   })
  // }

  // const onChangeEmail = (e) => {
  //   setEmail(state => {
  //     console.log(e.target.value)
  //     return e.target.value
  //   })
  // }

  // const loginHandler = () => {
  //   console.log(email, password)
  // }

  // const responseSuccessGoogle = async (res) => {
  //   let tokenId = res.tokenId
  //   console.log(tokenId)
  //   try{
  //     const body = {
  //       tokenId: tokenId
  //     }
  //     const response = await axios.post(`/api/auth/google-login-merchant`, body, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("success: ", response)
  //   }
  //   catch(err){
  //     console.log("error", err)
  //   }
    
  // }

  // const responseErrorGoogle = (res) => {
  //   console.log(res)
  // }

  // return (
  //   <div className="container" style={{
  //     height: "100vh"
  //   }}>
  //     <div style={{
  //       height: "100vh"
  //     }} className="row d-flex align-items-center justify-content-around">
  //       <div className="col-5">
  //         <TextField onChange={onChangeEmail}
  //           value={email}
  //           className="m-2"
  //           type={'email'}
  //           fullWidth label="Email"
  //           variant="outlined" />
  //         <TextField onChange={onChangePassword}
  //           value={password}
  //           className="m-2"
  //           fullWidth label="Password"
  //           type={'password'}
  //           variant="outlined" />
  //         <Button onClick={loginHandler} className="m-2" variant="outlined">Log In</Button>
  //         <GoogleLogin
  //           clientId="1008574452559-43bj1lusj5shgu89fb0hpgkqlkglk91j.apps.googleusercontent.com"
  //           buttonText="Login"
  //           onSuccess={responseSuccessGoogle}
  //           onFailure={responseErrorGoogle}
  //           cookiePolicy={'single_host_origin'}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
