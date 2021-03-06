import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Dashboard/Error";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={Login} />
      <PrivateRoute path="/dashboard/:id" component={Dashboard} />
      <Route path={"*"} component={Error} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
