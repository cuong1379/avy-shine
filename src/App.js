import React from "react";
import Home from "./Home/index";
import Login from "./Login/Index";
import Booking from "./Booking/Index";
import Dashboard from "./Dashboard/index";
import History from "./History/index";
import ListDoctor from "./ListDoctor/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/listdoctor">
          <ListDoctor />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
