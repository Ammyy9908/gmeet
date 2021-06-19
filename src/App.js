import Room from "./screens/Room"
import './App.css';

import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./screens/Home";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { setUser } from "./redux/actions/UiActions";

function App(props) {


  React.useEffect(()=>{
    const getUser = async ()=>{
       try{
          const r = await axios.get(`${process.env.REACT_APP_SERVER_PROD}/user`,{
             headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + Cookies.get("AUTH_TOKEN"),
             },
           });

           console.log(r.data);

           if(r.data.isData){
            props.setUser(r.data.user);
           }
           


          
          
       }
       catch(e){
          if(e.response && e.response.data){
             console.log(e.response.data);
          }
       }
    }
    Cookies.get("AUTH_TOKEN") && getUser();
 },
 // eslint-disable-next-line
 [])
  

  return (
    <Router>
    <div>
    
    
    <Switch>
    <Route exact path="/">
      <Home/>
      </Route>

      <Route exact path="/:code" render={(props) => {
   const id = props.match.params.code;
    return <Room id={id} />
}}  />
     
    </Switch>
  </div>
  </Router>
  );
}

const mapDispatchToProps = (dispatch)=>({
  setUser:user=>dispatch(setUser(user))
})
export default connect(null,mapDispatchToProps)(App);
