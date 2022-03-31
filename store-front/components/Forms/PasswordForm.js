import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Login.module.css";
import TextField from "@mui/material/TextField";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios'
import useURL from "../../utils/useURL";


const PasswordForm = () => {
    const [showError, setShowError] = useState(false)
    const [errorMsg, setError] = useState("")
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const loginLoading = useSelector(state => state.auth.loading)
    const onChangeOldPassword = (event) => {
        setOldPassword(event.target.value);
    };

    const onChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event) => {
        setConfirmNewPassword(event.target.value);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleMouseDownOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    useEffect(() => {
        setShowError(false)
    }, [])
    const changePassword = async (event) => {
        event.preventDefault();
        //various cases for input validation, matching format of password as well using regex
        if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
            setError("Password field(s) must not be left empty")
            setShowError(true)
        } else if (newPassword !== confirmNewPassword) {
            setError("New passwords entered do not match")
            setShowError(true)
        } else if (
            !newPassword.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ) ||
            !confirmNewPassword.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            )
        ) {
            setError("Minimum eight characters, at least one letter, one number and one special character")
            setShowError(true)
        } else {
            const data = {
                password: oldPassword,
                newPassword: newPassword,
            };

            console.log(data);

            try {
                const url = useURL();
                await axios.put(`${url}/api/customer/password`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.log(err.response);
                setError("Old Password does not match with the one stored in database")
                setShowError(true)
            }
        }
    };

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
                            <TextField
                                onChange={onChangeOldPassword}
                                value={oldPassword}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Current Password"
                                id="password"
                                autoComplete="current-password"
                                type={showOldPassword ? "text" : "password"}
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownOldPassword}
                                            >
                                                {showOldPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label mt-3">
                                New Password
                            </label>
                            <TextField
                                onChange={onChangeNewPassword}
                                value={newPassword}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                id="password"
                                autoComplete="current-password"
                                type={showNewPassword ? "text" : "password"}
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownNewPassword}
                                            >
                                                {showNewPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label mt-3">
                                Confirm New Password
                            </label>
                            <TextField
                                onChange={onChangeConfirmPassword}
                                value={confirmNewPassword}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Confirm New Password"
                                id="password"
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <button disabled={loginLoading} className={`${styles.login} mt-3`} type="submit" onClick={changePassword}>
                            {`Change Password`}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PasswordForm
