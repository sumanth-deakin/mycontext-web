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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    document.title = "Home";
    document.body.classList.add("white");

    var self = this;

    var url = "https://api-mycontext.herokuapp.com/record/listRecords";

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
                <SideBar current="home" />
              </nav>
              <div
                role="main"
                className="col-md-9 ml-sm-auto col-lg-10 pt-60 mobile-space"
              >
                <h2>Medical Records</h2>
                <hr />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Tumor Size</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Cancer Type</th>
                        <th scope="col">Year of Birth</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((record, index) => (
                        <tr key={index}>
                          <th scope="row">{record.name}</th>
                          <td>{record.cs_tumor_size}</td>
                          <td>{record.gender}</td>
                          <td>{record.cancer_type}</td>
                          <td>{record.year_of_birth}</td>
                          <td>{record.price}</td>
                          <td>
                            <button type="button" className="btn btn-warning">
                              Bid
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
