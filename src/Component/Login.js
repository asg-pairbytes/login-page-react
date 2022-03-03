import SignUpAvatar from "./SignUpAvatar";
import { TextField,makeStyles,Button,Grid,Box } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom'

const useStyle = makeStyles({
  box:{
    maxWidth: "500px",
    margin: "0px auto"
  }
});

const Login = (props) => {
    console.log(props);
  const classes = useStyle();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const [pending,setPending] = useState(false)
  const history=useHistory();

  const handleSubmit = (e) =>{
    e.preventDefault();
    // setPending(true)
    setEmailError(false)
    setPasswordError(false)
    if(email==='')
    {
      setEmailError(true)
      setPending(false)
    }
    else if(password==='')
    {
      setPasswordError(true)
      setPending(false)
    }else{
        const url = "https://api.vachanengine.org/v2/user/login?user_email="+email+"&password="+password
        console.log(url)
          axios.get(url,{
        headers:{
          'content-type': 'application/json'
        }
      }).then((item)=>{
        console.log(item.data.token);
        alert("Login Succesful")
        history.push("/")
        localStorage.setItem('login',true);
        localStorage.setItem('token',item.data.token);
        props.loginStatus(true)
      }).catch((error)=>{
        console.log(error.response.status);
        if(error.response.status===401)
        {
          alert("Invalid Credential")
        }
        else{
          alert("Error Occurred, Please try again after some time")
          setPending(false)
        }
      })
    }
  }
  return (
    <>
      <SignUpAvatar />
      <h2 style={{ marginBottom: "30px" }}>Login</h2>
      <Box component="form" noValidate sx={{ mt: 3 }} className={classes.box} onSubmit={(e)=>{handleSubmit(e)}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              variant="filled"
              onChange={(e)=>{setEmail(e.target.value)}}
              error={emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              variant="filled"
              onChange={(e)=>{setPassword(e.target.value)}}
              error={passwordError}
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
        {
          pending?
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled
          sx={{ mt: 3, mb: 2 }}
        >
          Please Wait....
        </Button>
          :
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        }
        
        <Grid container justifyContent="flex-end">
          <Grid item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Login;
