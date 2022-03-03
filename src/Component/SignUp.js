import SignUpAvatar from "./SignUpAvatar";
import { TextField,makeStyles,Button,Grid,Box } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'

const useStyle = makeStyles({
  box:{
    maxWidth: "500px",
    margin: "0px auto"
  }
});

const SignUp = (props) => {
  const classes = useStyle();
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [firstNameError,setFirstNameError] = useState(false)
  const [lastNameError,setLastNameError] = useState(false)
  const [emailError,setEmailError] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const [pending,setPending] = useState(false)
  const history=useHistory();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setPending(true)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setPasswordError(false)
    if(firstName==='')
    {
      setFirstNameError(true)
      setPending(false)
    }
    else if(lastName==='')
    {
      setLastNameError(true)
      setPending(false)
    }
    else if(email==='')
    {
      setEmailError(true)
      setPending(false)
    }
    else if(password==='')
    {
      setPasswordError(true)
      setPending(false)
    }else{
      const data = {
        firstname: firstName,
        email: email,
        password: password,
        lastname: lastName
      }
      axios.post("https://api.vachanengine.org/v2/user/register",data,{
        headers:{
          'content-type': 'application/json'
        }
      }).then((item)=>{
        console.log(item);
        alert("Login Succesful")
        localStorage.setItem('login',true);
        localStorage.setItem('token',item.data.token);
        props.loginStatus(true)
        history.push("/")
      }).catch((error)=>{
        console.log(error.response.status);
        if(error.response.status===400)
        {
          alert("You're Already Registered. Click to go on Login Page")
          history.push("/login")
        }else if(error.response.status===402)
        {
          alert("Please use a strong password")
          setPending(false)
        }else{
          alert("Error Occurred, Please try again after some time")
          setPending(false)
        }
      })
    }
  }
  return (
    <>
      <SignUpAvatar />
      <h2 style={{ marginBottom: "30px" }}>Sign Up</h2>
      <Box component="form" noValidate sx={{ mt: 3 }} className={classes.box} onSubmit={(e)=>{handleSubmit(e)}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              variant="filled"
              onChange={(e)=>{setFirstName(e.target.value)}}
              error={firstNameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="filled"
              onChange={(e)=>{setLastName(e.target.value)}}
              error={lastNameError}
            />
          </Grid>
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
          Sign Up
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
export default SignUp;
