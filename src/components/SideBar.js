import React, { Component } from "react";
import "../css/SideBar.css";
import Icon from "@mdi/react";
import { mdiHome, mdiFile,mdiPlus } from "@mdi/js";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <div className="box">
              <Icon
                path={mdiHome}
                size={1}
                horizontal
                vertical
                rotate={180}
                color={this.props.current === "home" ? "" : "#9e9e9e"}
              />
              <a
                className={
                  "nav-link " + (this.props.current === "home" ? "active" : "")
                }
                href="/"
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </div>
          </li>

          <li className="nav-item">
            <div className="box">
              <Icon
                path={mdiFile}
                size={1}
                horizontal
                vertical
                rotate={180}
                color={this.props.current === "records" ? "" : "#9e9e9e"}
              />
              <a
                className={
                  "nav-link " +
                  (this.props.current === "records" ? "active" : "")
                }
                href="/records"
              >
                Records
              </a>
            </div>
          </li>

          <li className="nav-item">
            <div className="box">
              <Icon
                path={mdiPlus}
                size={1}
                horizontal
                vertical
                rotate={180}
                color={this.props.current === "add" ? "" : "#9e9e9e"}
              />
              <a
                className={
                  "nav-link " +
                  (this.props.current === "add" ? "active" : "")
                }
                href="/add"
              >
                Add Record
              </a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
