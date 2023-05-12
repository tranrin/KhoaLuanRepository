import React from "react";
import Iconify from "./Iconfy";
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';

//const clientId = "616257410464-3ntqpoe89go6ulln7s85hasrdpj5hvfb.apps.googleusercontent.com"

 const ButtonLoginEmail = (props) =>{
  const navigate = useNavigate();
  const onSuccess = (res)=>{
    console.log("Login success!", res)
 
    if (res.accessToken) {
        localStorage.setItem("authenticated", res.accessToken);
        navigate("/Dashboard");
    }
  }
  const onFalure = (res)=>{
    console.log("Login success!", res)
  }
      return (
       
              <GoogleLogin
               render={renderProps => (
                <Button id={props.id} fullWidth size="large" color="inherit" variant="outlined" onClick={renderProps.onClick}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              
              </Button>
              )}
              // <GoogleButton id={props.id} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>

            //  className='GGButton'
              clientId={props.clientId}
              onSuccess={onSuccess}
              onFailure={onFalure}
              cookiePolicy={'single_host_origin'}
              //isSignedIn={true}
              />
            
             
            
            
      );
  }
  export default ButtonLoginEmail