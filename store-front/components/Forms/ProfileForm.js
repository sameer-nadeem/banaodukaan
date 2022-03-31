import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Login.module.css";
import useURL from "../../utils/useURL";
import axios from 'axios'
const ProfileForm = () => {
  const [showError, setShowError] = useState(false);
  const [eType, setEtype] = useState("error")
  const [errorMsg, setError] = useState("");
  const loginLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    setShowError(false);
    user !== null ? setFullName(user.firstName) : null
    user !== null ? setEmail(user.email) : null
    user !== null ? setAddress(user.address) : null
  }, [user]);
  const onChangeName = (event) => {
    setFullName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      if (fullName === "") {
        setError("Name cannot be empty")
        setShowError(true)
        return
      }
      if (address === "") {
        setError("Address cannot be empty")
        setShowError(true)
        return
      }
      const url = useURL()
      const { data } = await axios.put(`${url}/api/customer`, { fullName, address },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      console.log(data)
      setEtype("success")
      setError("Succefully updated profile")
      setShowError(true)
    } catch (error) {
      setError("something went wrong")
      setShowError(true)
      console.log(error)
    }
  }

  return (
    <>
      <div style={{ marginTop: "9%", marginLeft: "5%" }}>
        <h2 className={styles.h2}>My Profile</h2>
      </div>
      <div
        className="card"
        style={{ marginTop: "3%", marginLeft: "5%", borderRadius: "10px", height: '68%' }}
      >
        <div className={styles.cardInside}>
          <form className={styles.form}>
            <Alert
              style={{
                display: showError ? "" : "none",
              }}
              className="mb-3"
              severity={`${eType}`}
            >
              {errorMsg}
            </Alert>
            <div className={styles.p}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={fullName}
                onChange={onChangeName}
              ></input>
              <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                name="emailRegister"
                disabled
                value={email}
                onChange={onChangeEmail}
              />

              <div id="emailHelp" className="form-text"></div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                  Address
                </label>
                <input type="text" className="form-control" value={address} onChange={onChangeAddress} />
              </div>
            </div>
            <div className="mt-3" style={{ marginTop: "10%" }}></div>
            <button
              disabled={loginLoading}
              className={styles.login}
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
