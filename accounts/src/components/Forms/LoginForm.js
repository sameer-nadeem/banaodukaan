import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import GoogleButton from 'react-google-button'


const LoginForm = () => {

    const responseSuccessGoogle = async (res) => {
        let tokenId = res.tokenId
        console.log(tokenId)
        try{
        const body = {
            tokenId: tokenId
        }
        const response = await axios.post(`/api/auth/google-login-merchant`, body, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        console.log("success: ", response)
        }
        catch(err){
        console.log("error", err)
        }
        
    }

    const responseErrorGoogle = (res) => {
        console.log(res)
    }


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
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <div style = {{marginTop: 15,}}> 
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{backgroundColor: "#345DA7", color:'white', height: 55, fontWeight: '500'}}
                    >
                        Log In
                    </Button>
                    <div style = {{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                        <GoogleLogin
                        clientId="1008574452559-43bj1lusj5shgu89fb0hpgkqlkglk91j.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{width: '100%', borderRadius: 4}}>Log in with Google</GoogleButton>
                          )}
                        />
                    </div>
                    
                </div>

                <div style = {{marginTop: 15, marginBottom: 60}}>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#" variant="body2" style = {{fontSize: "0.92rem", fontWeight: 400, margin: 0, lineHeight: "1.5rem", color: '#3B8AC4'}}>
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <h3 style = {{fontSize: "0.92rem", fontWeight: 400, margin: 0, lineHeight: "1.5rem", color: '#454f5b'}}>{'New to BanaoDukaan? '}
                                <Link to="/signup" variant="body2" style = {{color: '#3B8AC4'}}>
                                    Get Started
                                </Link>
                            </h3>
                        </Grid>
                    </Grid>
                </div> 
            </Box>
        </div>
    );
};

export default LoginForm