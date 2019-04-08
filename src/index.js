import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/" component={Home} />
    </React.Fragment>
  </Router>,
  document.getElementById("root")
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("access-token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
