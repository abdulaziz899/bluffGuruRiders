import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Travel from './components/Travel/Travel';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { createContext} from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Location from './components/Location/Location';

export const userContext=createContext();
function App() {
  const [logInUser,setLogInUser]=useState({});
  const [traveling,setTraveling]=useState([]);
  return (
    <div  >
      <userContext.Provider value={[logInUser,setLogInUser],[traveling,setTraveling]}>
      <Router>
      <Header></Header>
          <Switch>
            <Route path="/home"><Home></Home></Route>
            <Route exact path="/"><Home></Home></Route>
            <PrivateRoute path="/destination/:travelingWayName"><Destination></Destination></PrivateRoute>
            <PrivateRoute  path="/destination"><Destination></Destination></PrivateRoute>
            <Route path="/travel"><Travel></Travel></Route>
            <Route path="/login"><Login></Login></Route>
          </Switch>
      </Router>
      </userContext.Provider>
        
    </div>
  )
}

export default App;
