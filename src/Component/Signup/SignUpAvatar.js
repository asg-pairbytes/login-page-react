import { Avatar,makeStyles } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyle = makeStyles({
  avatar: {
    backgroundColor: "red",
    width: "60px",
    height: "60px",
    display: "flex",
    margin: "100px auto 0px auto"
  }
})

const SignUpAvatar = () =>{
    const classes = useStyle();
    return(
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large"/>
        </Avatar>
    )
}

export default SignUpAvatar;