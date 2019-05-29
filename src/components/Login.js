import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { RingLoader } from "react-spinners";

import "../css/Login.css";
var logo = require("../img/logo.png");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  componentDidMount() {
    document.title = "Login";
    document.body.classList.add("black");
  }

  componentWillUnmount() {
    document.body.classList.remove("black");
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    self.setState({ loading: true });

    var url = "https://api-mycontext.herokuapp.com/user/login";

    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url, payload)
      .then(function(response) {
        if (response.data.success) {
          localStorage.setItem("access-token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("user_type", response.data.user_type);
          self.props.history.push("/");
        } else {
          self.setState({ loading: false });
          ToastsStore.error(response.data.message);
        }
      })
      .catch(function(error) {
        self.setState({ loading: false });
        ToastsStore.error("Something went wrong!");
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container h-100">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        {this.state.loading ? (
          <div className="loading">
            <RingLoader
              sizeUnit={"px"}
              size={80}
              color={"#0ca678"}
            />
          </div>
        ) : (
          <div className="row h-100">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
              <div className="card card-signin">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <img src={logo} height="50px" width="50px" alt="Logo" />
                    Welcome To MyContext
                  </h5>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember password
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Login
                    </button>
                    <hr className="my-4" />
                    <p className="text-right">
                      New User?
                      <a href="/register" className="text-primary">
                        SignUp
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
