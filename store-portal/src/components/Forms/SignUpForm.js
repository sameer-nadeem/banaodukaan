import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {  InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from 'react';

const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    // handle submit function
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    }
    return (
        <div>
            {/* form starts here */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                name="First name"
                label="First name"
                id="First name"
                autoComplete="First name"
                
                />
                <TextField
                margin="normal"
                required
                name="Last name"
                label="Last name"
                id="Last name"
                autoComplete="Last name"
               
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{ // <-- This is where the toggle button is added.
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
                    )
                  }}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="Confirm new password"
                label="Current new password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{ // <-- This is where the toggle button is added.
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
                    )
                  }}
                />

                </div>

                <div style = {{marginTop: 15}}> 
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{backgroundColor: "#345DA7", color:'white', height: 60, fontWeight: '500'}}
                    >
                        Create BanaoDukaan ID
                    </Button>
                    
                </div>

                <div style = {{marginTop: 15, marginBottom: 60}}>
                    <Grid container>
                        <Grid item>
                            <h3 style = {{fontSize: "0.92rem", fontWeight: 400, margin: 0, lineHeight: "1.5rem", color: '#454f5b'}}>{'Already have an account? '}
                                <Link to="#" variant="body2" style = {{color: '#3B8AC4'}}>
                                    Login
                                </Link>
                            </h3>
                        </Grid>
                    </Grid>
                </div> 
            </Box>
        </div>
    );
};

export default SignUpForm