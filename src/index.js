import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "popper.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Router>
    <React.Fragment>
      <Route exact path="/" component={Login} />
      <Route exact path="/Register" component={Register} />
    </React.Fragment>
  </Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
