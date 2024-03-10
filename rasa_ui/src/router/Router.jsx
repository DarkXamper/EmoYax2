// Router.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Basic from "../components/Basic";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/chat" component={Basic} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
