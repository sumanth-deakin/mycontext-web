import React, { Component } from "react";
import "../css/NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = event => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
          MyContext
        </a>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-md-none">
            <a className="nav-link" href="/records">
              My Records
            </a>
          </li>
          <li className="nav-item text-nowrap d-md-none">
            <a className="nav-link" href="/add">
              Add Record
            </a>
          </li>
          <li className="nav-item text-nowrap">
            <a className="nav-link hand" onClick={this.logout}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
