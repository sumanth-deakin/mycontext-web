import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentDidMount() {
    document.title = "Register";
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;

    if (this.state.password !== this.state.confirmPassword) {
      ToastsStore.warning("Password doesn't match");
    } else {
      var url = "http://localhost:9000/user/register";

      var payload = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post(url, payload)
        .then(function(response) {
          if (response.data.success) {
            self.props.history.push("/login");
          } else {
            ToastsStore.error(response.data.message);
          }
        })
        .catch(function(error) {
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
        <div className="row h-100">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
            <div className="card card-signin">
              <div className="card-body">
                <h5 className="card-title text-center">SignUp</h5>
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
      </div>
    );
  }
}

export default Register;
