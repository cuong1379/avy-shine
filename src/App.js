import React from "react";
import Home from "./Home/index";
import Login from "./Login/Index";
import Booking from "./Booking/Index";

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

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
