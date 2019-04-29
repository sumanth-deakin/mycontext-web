import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.min";
import { RingLoader } from "react-spinners";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

var logo = require("../img/logo.png");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      user_type: "Patient",
      loading: false
    };
  }

  componentDidMount() {
    document.title = "Register";
    document.body.classList.add("black");
  }

  componentWillUnmount() {
    document.body.classList.remove("black");
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;

    if (this.state.password !== this.state.confirmPassword) {
      ToastsStore.warning("Password doesn't match");
    } else {
      self.setState({ loading: true });

      var url = "http://api-mycontext.herokuapp.com/user/register";

      var payload = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        user_type: this.state.user_type
      };

      axios
        .post(url, payload)
        .then(function(response) {
          if (response.data.success) {
            ToastsStore.error("Registration successful, login to continue..");
            self.props.history.push("/login");
          } else {
            self.setState({ loading: false });
            ToastsStore.error(response.data.message);
          }
        })
        .catch(function(error) {
          self.setState({ loading: false });
          ToastsStore.error("Something went wrong!");
        });
    }
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
              size={100}
              color={"#0ca678"}
              loading="true"
            />
          </div>
        ) : (
          <div className="row h-100">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
              <div className="card card-signin">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    <img src={logo} height="50px" width="50px" alt="Logo" />
                    SignUp
                  </h5>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputName"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        autoFocus
                      />
                      <label htmlFor="inputName">Name</label>
                    </div>

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

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputConfirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        required
                      />
                      <label htmlFor="inputConfirmPassword">
                        Confirm Password
                      </label>
                    </div>

                    <div className="form-group">
                      <select
                        className="form-control select"
                        name="user_type"
                        value={this.state.user_type}
                        onChange={this.handleChange}
                      >
                        <option value="Patient" defaultValue>
                          Patient
                        </option>
                        <option value="Medical Practitioner">
                          Medical Practitioner
                        </option>
                        <option value="Pharmaceutical Company">
                          Pharmaceutical Company
                        </option>
                        <option value="R&D Labs">R&D Labs</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Create
                    </button>
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

export default Register;
