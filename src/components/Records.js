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
import $ from "jquery";
import { RingLoader } from "react-spinners";

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      index: undefined,
      email: ""
    };
  }

  componentDidMount() {
    document.title = "Records";
    document.body.classList.add("white");

    var self = this;

    var url = "https://api-mycontext.herokuapp.com/record/listOwnerRecords";

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

  viewDetails = (event, id) => {
    window.open("/view/" + id, "_blank");
  };

  editDetails = (event, id) => {
    window.open("/edit/" + id, "_blank");
  };

  handleDelete = (event, index) => {
    this.setState({ index: index });
    $("#deleteModal").modal("show");
  };

  deleteRecord = event => {
    $("#deleteModal").modal("hide");
    const record = this.state.data[this.state.index];
    this.setState({
      loading: true
    });

    var url = "https://api-mycontext.herokuapp.com/record/deleteRecord";
    var self = this;

    var payload = {
      token: localStorage.getItem("access-token"),
      id: record._id
    };

    axios
      .post(url, payload)
      .then(function(response) {
        if (response.data.success) {
          self.setState({
            data: self.state.data.filter((_, i) => i !== self.state.index)
          });

          console.log(self.state.data)

          ToastsStore.success(response.data.message);
          self.setState({
            loading: false,
            index: undefined
          });
        } else {
          ToastsStore.error(response.data.message);
        }
      })
      .catch(function(error) {
        self.setState({
          loading: false,
          index: undefined
        });
        ToastsStore.error("Something went wrong!");
      });
  };

  handleTransfer = (event, index) => {
    this.setState({ index: index });
    $("#transferModal").modal("show");
  };

  transferRecord = event => {
    $("#transferModal").modal("hide");
    const record = this.state.data[this.state.index];
    this.setState({
      loading: true
    });

    var url = "https://api-mycontext.herokuapp.com/record/changeOwnership";
    var self = this;

    var payload = {
      token: localStorage.getItem("access-token"),
      medicalrecordId: record._id,
      newOwnerMail: this.state.email
    };

    axios
      .post(url, payload)
      .then(function(response) {
        if (response.data.success) {
          self.setState({
            data: self.state.data.filter((_, i) => i !== self.state.index)
          });

          ToastsStore.success(response.data.message);
        } else {
          ToastsStore.error(response.data.message);
        }

        self.setState({
          loading: false,
          email: "",
          index: undefined
        });
      })
      .catch(function(error) {
        self.setState({
          loading: false,
          email: "",
          index: undefined
        });
        ToastsStore.error("Something went wrong!");
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
                <SideBar current="records" />
              </nav>
              <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-60 mobile-space">
                <h2>Your Medical Records</h2>
                <hr />
                {this.state.data.length > 0 ? (
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Tumor Size</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Year of Birth</th>
                        <th scope="col">Cancer Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Transfer</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
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
                          <td>{record.cancer_type}</td>
                          <td>{record.price}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={event => {
                                this.handleTransfer(event, index);
                              }}
                            >
                              Transfer
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={event => {
                                this.handleDelete(event, index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={event => {
                                this.editDetails(event, record._id);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={event => {
                                this.viewDetails(event, record._id);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No medical records found, create one.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure? you want to delete medical record.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  id="deleteRecord"
                  type="button"
                  className="btn btn-danger"
                  onClick={event => {
                    this.deleteRecord(event);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="transferModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="transferModallabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="transferModallabel">
                  Transfer
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  id="deleteRecord"
                  type="button"
                  className="btn btn-primary"
                  onClick={event => {
                    this.transferRecord(event);
                  }}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Records;
