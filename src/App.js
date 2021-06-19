import Room from "./screens/Room"
import './App.css';

import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  

  return (
    <Router>
    <div>
    
    
    <Switch>
    <Route exact path="/">
      <h1>Home Page</h1>
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

export default App;
