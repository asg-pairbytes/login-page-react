import { useState } from "react";
import { TextField,makeStyles,Button,Grid,Box } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
    box:{
      maxWidth: "500px",
      margin: "0px auto"
    }
  });

  const CreateProject = () =>{
    const history=useHistory();
    const classes = useStyle();
    const [projectName,setProjectName] = useState("")
    const [sourceLanguage,setSourceLanguage] = useState("")
    const [targetLanguage,setTargetLanguage] = useState("")
    const [projectNameError,setProjectNameError] = useState(false)
    const [sourceError,setSourceError] = useState(false)
    const [targetError,setTargetError] = useState(false)
    const [pending,setPending] = useState(false)
    const handleSubmit = (e) =>{
      e.preventDefault();
      setProjectNameError(false)
      setSourceError(false)
      setTargetError(false)
      setPending(false)
      if(projectName==="")
      {
        setProjectNameError(true)
      }else if(sourceLanguage==="")
      {
        setSourceError(true)
      }else if(targetLanguage==="")
      {
        setTargetError(true)
      }else{
        setPending(true)
        const token = localStorage.getItem('token');
        axios.post("https://api.vachanengine.org/v2/autographa/projects",{
          "projectName": projectName,
          "sourceLanguageCode": sourceLanguage,
          "targetLanguageCode": targetLanguage
        },{
          headers:{
            "content-type": "application/json",
            "app": "Autographa",
            "Authorization": `Bearer ${token}`
          }
        }).then((item)=>{
          alert("Project Created Succesfully")
          history.push("/view-project")
          setPending(false)
        }).catch((error)=>{
          if(error.response.status===403)
          {
            alert("Permission Denied")
            setPending(false)
            history.push("/")
          }else if(error.response.status===422){
            alert("Invalid Language id")
            setPending(false)
          }else if(error.response.status===409){
            alert("Test already exist")
            setPending(false)
          }else{
            // console.log(error)
            setPending(false)
            alert("Error Caused, Please try again")
          }
        })
      }
    }
    return(
        <>
        <h1>Create Project</h1>
        <Box component="form" noValidate sx={{ mt: 3 }} className={classes.box} 
        onSubmit={(e)=>{handleSubmit(e)}}
        >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="projectName"
              required
              fullWidth
              label="Project Name"
              id="projectName"
              variant="filled"
              onChange={(e)=>{setProjectName(e.target.value)}}
              error={projectNameError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="sourceLanguageCode"
              label="Source Language Code"
              name="sourceLanguageCode"
              variant="filled"
              onChange={(e)=>{setSourceLanguage(e.target.value)}}
              error={sourceError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="targetLanguageCode"
              label="Target Language Code"
              name="targetLanguageCode"
              variant="filled"
              onChange={(e)=>{setTargetLanguage(e.target.value)}}
              error={targetError}
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
          Add Project
        </Button>
        }
        
        <Grid container justifyContent="flex-end">
          <Grid item>
          </Grid>
        </Grid>
      </Box>
        </>
    )
}

export default CreateProject;