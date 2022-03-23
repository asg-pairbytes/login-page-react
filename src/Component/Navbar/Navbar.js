import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,useHistory} from 'react-router-dom'
import styles from "../../Stylesheet/navbar.module.css"
import axios from 'axios';
import Dropdown from './Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
},
title: {
    flexGrow: 1
},
}));

const Navbar = (props) => {
  const history= useHistory();
  const classes = useStyles();
  const logout = () =>{
    const token = localStorage.getItem('token')
    axios.get("https://api.vachanengine.org/redoc#operation/logout_v2_user_logout_get",{headers:{
      'content-type': 'application/json',
      'token': token
    }}).then(()=>{
      alert("Logout Succesfull")
      props.setlogin(false)
      localStorage.removeItem('token')
      localStorage.removeItem('login')
      history.push("/")
    }).catch((err)=>{
      alert("Error occured, Please try again")
    })
  }
  console.log(props.login)

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="left">
        <Link to="/" className={styles["redirectLink"]}>
            Pair Bytes
          </Link>
          </Typography>
          {
            props.login?
            <>
              <Dropdown />
              <span style={{marginRight: "20px"}}></span>
            <Avatar>
            </Avatar>
              <Button color="inherit" onClick={()=>{logout()}}>Log Out</Button>
            </>
            :
            <>
            <Link to="/signup" className={styles["redirectLink"]}><Button color="inherit">Sign Up</Button></Link>
            <Link to="/login" className={styles["redirectLink"]}><Button color="inherit">Login</Button></Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;