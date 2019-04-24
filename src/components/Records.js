import React, { Component } from "react";
import "../css/Home.css";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

import { RingLoader } from "react-spinners";

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    document.title = "Records";
    document.body.classList.add("white");

    var self = this;

    var url = "http://localhost:9000/record/listOwnerRecords";

    var payload = {
      token: localStorage.getItem("access-token")
    };

    axios
      .post(url, payload)
      .then(function(response) {
        if (response.data.success) {
          self.setState({ data: response.data.data, loading: false });
          console.log(self.state.data);
        } else {
          ToastsStore.error(response.data.message);
        }
      })
      .catch(function(error) {
        ToastsStore.error("Something went wrong!");
      });
  }

  componentWillUnmount() {
    document.body.classList.remove("white");
  }

  render() {
    return (
      <React.Fragment>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <NavBar {...this.props} />
        {this.state.loading ? (
          <div className="loading">
            <RingLoader sizeUnit={"px"} size={100} color={"#212529"} />
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <SideBar current="records"/>
              </nav>
              <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-60">
                <h2>Your Medical Records</h2>
                <hr />
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Tumor Size</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Year of Birth</th>
                      <th scope="col">Price</th>
                      <th scope="col">Transfer</th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((record, index) => (
                      <tr key={index}>
                        <th scope="row">{record.name}</th>
                        <td>{record.cs_tumor_size}</td>
                        <td>{record.gender}</td>
                        <td>{record.year_of_birth}</td>
                        <td>{record.price}</td>
                        <td>
                          <button type="button" className="btn btn-danger">
                            Transfer
                          </button>
                        </td>
                        <td>
                          <button type="button" className="btn btn-primary">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Records;
