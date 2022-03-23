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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoadingPage from "../LoadingAnimation/LoadingPage";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useRouteMatch } from "react-router-dom";
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#FFF",
    border: "2px solid #FFF",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listItem: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

const ViewProject = () => {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState();
  const [progress, setProgress] = useState({});
  const [progressPending, setProgressPending] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [projectId, setProjectId] = useState();
  const [addUserProgress, setAddUserProgress] = useState(false);
  const [selectMenu, setSelectMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [userList,setUserList] = useState([]);

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
        if (item.data.length === 0) {
          alert("Permission Denied");
          history.push("/");
        }
      })
      .catch((error) => {
        alert("Error Caused, Please try again");
        history.push("/");
      });
  }, []);

  const handleOpen = (p) => {
    // setOpen(true);
    setProjectId(p);
    setAddUserProgress(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://api.vachanengine.org/v2/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((item) => {
        setUserList(item.data);
        setOpen(true);
        setAddUserProgress(false);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("Permission Denied");
          setAddUserProgress(false);
        } else {
          setAddUserProgress(false);
          alert("Error Caused, Please try again");
        }

        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectMenuOpen = () =>{
    setSelectMenu(true);
  }
  const handleSelectMenuClose = () =>{
    setSelectMenu(false);
  }

  const handleMenuChange = (e) =>{
    setUserName(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(userName==="")
    {
      alert("please select a user");
    }else{
      const token = localStorage.getItem("token");
      const url = `https://api.vachanengine.org/v2/autographa/project/user?project_id=${projectId}&user_id=${userName}`;
      let statusCode;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          app: "Autographa",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          statusCode = res.status;
          return res.json();
        })
        .then((data) => {
          console.log(userName);
          if (statusCode===403) {
            alert("Permission denied");
          } else if (statusCode===409) {
            alert("User already exist in project");
          } else if(statusCode===404) {
            alert("User doesnt exist");
          }else if(statusCode===201){
            alert("User added succesfully");
            console.log(data,projectId,userName);
            handleClose();
          }else{
            alert("error occurred please try again");
          }
        })
        .catch((error) => {
         
        });
    }
  };
  const show = (index, id) => {
    for (let i = 0; i < data.length; i++) {
      setProgressPending(true);
      if (i === index) {
        if (
          document.getElementById(i).style.display === "block" ||
          document.getElementById(i).style.display === ""
        ) {
          document.getElementById(i).style.display = "none";
        } else {
          document.getElementById(i).style.display = "block";
        }
      } else {
        document.getElementById(i).style.display = "none";
      }
    }
    const token = localStorage.getItem("token");
    // console.log();
    axios
      .get(
        `https://api.vachanengine.org/v2/autographa/project/progress?project_id=${id}`,
        {
          headers: {
            "content-type": "application/json",
            app: "Autographa",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((item) => {
        setProgress(item.data);
        setProgressPending(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {addUserProgress ? <LoadingPage /> : null}
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
                    <Button
                      size="small"
                      color="primary"
                      type="button"
                      onClick={() => {
                        handleOpen(item.projectId);
                      }}
                    >
                      Add User
                    </Button>
                    <Button size="small" color="primary" name="box">
                      <span
                        onClick={() => {
                          show(index, item.projectId);
                        }}
                      >
                        View Progress
                      </span>
                    </Button>
                  </CardActions>
                  <div style={{ display: "none" }} id={index}>
                    {progressPending ? (
                      <LoadingAnimation />
                    ) : progress ? (
                      <div>
                        <h3 style={{ margin: "0px" }}>
                          Confirmed: {progress.confirmed}
                        </h3>
                        <h3 style={{ margin: "0px" }}>
                          Suggestion: {progress.suggestion}
                        </h3>
                        <h3 style={{ margin: "0px 0px 15px 0px" }}>
                          Untranslated: {progress.untranslated}
                        </h3>
                      </div>
                    ) : null}
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
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  className={classes.box}
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <Typography variant="h4" style={{ marginBottom: "30px" }}>
                    Add User
                  </Typography>
                  <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Users</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    onClose={handleSelectMenuClose}
                    onOpen={handleSelectMenuOpen}
                    value={userName}
                    onChange={handleMenuChange}
                    style={{marginBottom: "20px"}}
                  >
                    {
                      userList.map((item,index)=>{
                        return(
                        <MenuItem value={item.userId} key={index}>{item.name.fullname}</MenuItem>
                        )
                      })
                    }
                  </Select>
                  </FormControl>
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
