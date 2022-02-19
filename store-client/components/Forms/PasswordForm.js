import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Login.module.css";
const PasswordForm = () => {
    const [showError, setShowError] = useState(false)
    const [errorMsg, setError] = useState("")
    const loginLoading = useSelector(state => state.auth.loading)

    useEffect(() => {
        setShowError(false)
    }, [])
    return (
        <>
            <div style={{ marginTop: '9%', marginLeft: '5%' }}>
                <h2 className={styles.h2}>Change Password</h2>
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
                            <label htmlFor="password" className="form-label mt-3">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name='passwordLogin'
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label mt-3">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name='passwordLogin'
                            />
                        </div>
                        <button disabled={loginLoading} className={`${styles.login} mt-3`} type="submit">
                            {`Change Password`}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PasswordForm
