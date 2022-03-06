import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import SignUp from './Component/Signup/SignUp';
import Login from './Component/Login/Login';
import CreateProject from './Component/Projects/CreateProject';
import './App.css';
import {useEffect, useState} from 'react'
import AddUser from './Component/Projects/AddUser';
import ViewProject from './Component/Projects/ViewProject';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"


function App() {
  const [login,setLogin] = useState()
  useEffect(()=>{
    setLogin(localStorage.getItem('login'))
    console.log(login)
  },[login])
  return (
    <div className="App">
      <Router>
    <Navbar login={login} setlogin={setLogin}/>
    <div style={{margin: "80px 10px"}}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <SignUp loginStatus={setLogin}/>
      </Route>
      <Route exact path="/login" loginStatus={setLogin}>
        <Login loginStatus={setLogin}/>
      </Route>
      <Route exact path="/create-project">
        <CreateProject />
      </Route>
      <Route exact path="/view-project">
        <ViewProject />
      </Route>
      <Route exact path="/add-user">
        <AddUser />
      </Route>
    </Switch>
    </div>
    </Router>
    </div>
  );
}

export default App;
