import Navbar from './Component/Navbar';
import Home from './Component/Home';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import './App.css';
import {useEffect, useState} from 'react'

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
    <Switch>
    <div style={{margin: "80px 10px"}}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <SignUp loginStatus={setLogin}/>
      </Route>
      <Route exact path="/login" loginStatus={setLogin}>
        <Login loginStatus={setLogin}/>
      </Route>
    </div>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
