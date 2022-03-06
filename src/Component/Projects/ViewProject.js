import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField,Button,Grid,Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 380,
    margin: "10px 10px",
    "&:hover": {
      boxShadow: "3px 3px 10px 5px #ccc",
    },
  },
  media: {
    height: 140,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#FFF",
    border: '2px solid #FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ViewProject = () => {
  const history=useHistory();
  const classes = useStyles();
  const [data, setData] = useState();
  const [progress,setProgress] = useState({})
  const [progressPending, setProgressPending] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userIdError,setUserIdError] = useState(false);
  const [projectId,setProjectId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.vachanengine.org/v2/autographa/projects", {
        headers: {
          "content-type": "application/json",
          app: "Autographa",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((item) => {
          setData(item.data);
          if(item.data.length===0)
          {
            alert("Permission Denied")
            history.push("/")
          }
      })
      .catch((error) => {
          alert("Error Caused, Please try again")
          history.push("/")
      });
  }, []);

  const handleOpen = (p) => {
    setOpen(true);
    setProjectId(p);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    setUserIdError(false)
    const user_id = document.querySelector("#user_id").value;
    if(user_id==="")
    {
      setUserIdError(true);
    }else if(!user_id.includes("@")){
      alert("Please enter a valid email")
    }else{
      const token = localStorage.getItem('token');
      // console.log(`https://api.vachanengine.org/v2/autographa/project/user?project_id=${projectId}&user_id=93001cce-ccb9-4f82-b7e6-f95a0f185f4b`);
      // axios.post(`https://api.vachanengine.org/v2/autographa/project/user?project_id=${projectId}&user_id=93001cce-ccb9-4f82-b7e6-f95a0f185f4b`,{
      //   headers:{
      //     "content-type": "application/json",
      //     "app": "Autographa",
      //     "Authorization": `Bearer ${token}`
      //   }
      // }).then((item)=>{
      //   console.log(item);
      // }).catch((error)=>{
      //   console.log(error);
      // })


      const options = {
        headers: {"content-type": "application/json",  "app": "Autographa", "Authorization": "Bearer ${token}"}
      };
      
      axios.post('https://api.vachanengine.org/v2/autographa/project/user', {
        project_id: projectId,
        user_id: '93001cce-ccb9-4f82-b7e6-f95a0f185f4b'
      }, options).then((item)=>{
        console.log(item);
      }).catch((error)=>{
        console.log(error);
      })
    }
  } 
  const show = (index,id) => {
    for (let i = 0; i < data.length; i++) {
      setProgressPending(true)
      if (i === index) {
        if (document.getElementById(i).style.display === "block" || document.getElementById(i).style.display === "") {
            document.getElementById(i).style.display = "none";
          } else {
              document.getElementById(i).style.display = "block";
            }
          } else {
        document.getElementById(i).style.display = "none";
      }
    }
    const token = localStorage.getItem('token');
    // console.log();
    axios.get(`https://api.vachanengine.org/v2/autographa/project/progress?project_id=${id}`,{
      headers:{
        "content-type": "application/json",
        "app": "Autographa",
        "Authorization": `Bearer ${token}`
      }
    }).then((item)=>{
      setProgress(item.data);
      setProgressPending(false)
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data
          ? data.map((item, index) => {
              return (
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.projectName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                      >
                        <h3>
                          Source Language Code : {item.sourceLanguage.language}
                        </h3>
                        <h3>
                          Target Language Code : {item.targetLanguage.language}
                        </h3>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" type="button" onClick={()=>{handleOpen(item.projectId)}}>
                      Add User
                    </Button>
                    <Button size="small" color="primary" name="box">
                      <span
                        onClick={() => {
                          show(index,item.projectId);
                        }}
                      >
                        View Progress
                      </span>
                    </Button>
                  </CardActions>
                    <div style={{ display: "none" }} id={index}>
                      {
                        progressPending?
                        <LoadingAnimation />
                        :
                        progress?
                        <div>
                        <h3 style={{margin: "0px"}}>Confirmed: {progress.confirmed}</h3>
                        <h3 style={{margin: "0px"}}>Suggestion: {progress.suggestion}</h3>
                        <h3 style={{margin: "0px 0px 15px 0px"}}>Untranslated: {progress.untranslated}</h3>
                        </div>
                        :
                        null
                      }
                    </div>
                </Card>
              );
            })
          : null}
          <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Box component="form" noValidate sx={{ mt: 3 }} className={classes.box} 
        onSubmit={(e)=>{handleSubmit(e)}}
        >
            <Typography variant="h4" style={{marginBottom: "30px"}}>
              Add User
            </Typography>
            <TextField
              required
              fullWidth
              id="user_id"
              label="User Id"
              name="user_id"
              variant="filled"
              style={{marginBottom: "30px"}}
              type="email"
              error={userIdError}
            />
            <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Project
        </Button>
        </Box>
          </div>
        </Fade>
      </Modal>
    </div>

      </div>

      {/* Add User */}

      

    </>
  );
};

export default ViewProject;
