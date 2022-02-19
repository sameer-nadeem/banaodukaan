import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Login.module.css";
import { register } from '../../actions/auth';
const ProfileForm = () => {
    const [showError, setShowError] = useState(false)
    const [errorMsg, setError] = useState("")
    const loginLoading = useSelector(state => state.auth.loading)

    
    useEffect(() => {
        setShowError(false)
    }, [])
    return (
        <>
            <div style={{ marginTop: '9%', marginLeft: '5%' }}>
                <h2 className={styles.h2}>My Profile</h2>
            </div>
            <div className="card" style={{ marginTop: '3%', marginLeft: '5%', borderRadius: '10px' }}>
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
                                    name='fullName'></input>
                            </div>
                            <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                name='emailRegister'
                            />

                            <div id="emailHelp" className="form-text"></div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="mt-3" style={{ marginTop: "10%" }}></div>
                        <button disabled={loginLoading} className={styles.login} type="submit">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ProfileForm
