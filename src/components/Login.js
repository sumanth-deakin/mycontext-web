import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import "../css/Login.css";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

      var url = "http://localhost:9000/user/login";

      var payload = {
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post(url, payload)
        .then(function(response) {
          if (response.data.success) {
            console.log(response.data)
            localStorage.setItem("access-token", response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            self.props.history.push("/");
          } else {
            ToastsStore.error(response.data.message);
          }
        })
        .catch(function(error) {
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
        <div className="row h-100">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
            <div className="card card-signin">
              <div className="card-body">
                <h5 className="card-title text-center">Welcome To MyContext</h5>
                <form className="form-signin"  onSubmit={this.handleSubmit}>
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
                    <label className="custom-control-label" htmlFor="customCheck1">
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
                  <p className="text-right">New User? <a href="/Register">SignUp</a></p>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
