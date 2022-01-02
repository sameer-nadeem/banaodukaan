import { Button, TextField } from "@mui/material"
import { useState } from "react";
function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangePassword = (e) => {
    setPassword(state => {
      console.log(e.target.value)
      return e.target.value
    })
  }

  const onChangeEmail = (e) => {
    setEmail(state => {
      console.log(e.target.value)
      return e.target.value
    })
  }

  const loginHandler = () => {
    console.log(email, password)
  }

  return (
    <div className="container" style={{
      height: "100vh"
    }}>
      <div style={{
        height: "100vh"
      }} className="row d-flex align-items-center justify-content-around">
        <div className="col-5">
          <TextField onChange={onChangeEmail}
            value={email}
            className="m-2"
            type={'email'}
            fullWidth label="Email"
            variant="outlined" />
          <TextField onChange={onChangePassword}
            value={password}
            className="m-2"
            fullWidth label="Password"
            type={'password'}
            variant="outlined" />
          <Button onClick={loginHandler} className="m-2" variant="outlined">Log In</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
