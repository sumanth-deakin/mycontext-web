import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
            <div className="card card-signin">
              <div className="card-body">
                <h5 className="card-title text-center">SignUp</h5>
                <form className="form-signin">
                <div className="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      className="form-control"
                      placeholder="Name"
                      required
                      autofocus
                    />
                    <label for="inputName">Name</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Confirm Password</label>
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
