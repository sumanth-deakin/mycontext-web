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
    document.title = "Medical Record";
    document.body.classList.add("white");

    var self = this;

    var url = "http://api-mycontext.herokuapp.com/record/viewRecord";

    var payload = {
      token: localStorage.getItem("access-token"),
      id: this.props.match.params.id
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
                <SideBar current="records" />
              </nav>
              <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-60 mobile-space">
                <h3>{this.state.data.name + " Medical Record"}</h3>
                {this.state.data ? (
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <th>Price</th>
                        <td>{this.state.data.price}</td>
                      </tr>
                      <tr>
                        <th>Age at Diagnosis</th>
                        <td>{this.state.data.age_at_diagnosis}</td>
                      </tr>
                      <tr>
                        <th>GP Practice</th>
                        <td>{this.state.data.gp_practice}</td>
                      </tr>
                      <tr>
                        <th>GP Practice Address</th>
                        <td>{this.state.data.gp_practice_address}</td>
                      </tr>
                      <tr>
                        <th>Behavior Code ICD</th>
                        <td>{this.state.data.behavior_code}</td>
                      </tr>
                      <tr>
                        <th>Behavior Recode for Analysis</th>
                        <td>{this.state.data.behavior_recode_for_analysis}</td>
                      </tr>
                      <tr>
                        <th>Breast Adjusted AJCC 6th Stage</th>
                        <td>{this.state.data.breast_adjusted_ajcc_6_stage}</td>
                      </tr>
                      <tr>
                        <th>Breast Adjusted AJCC 6th M</th>
                        <td>{this.state.data.breast_adjusted_ajcc_6m}</td>
                      </tr>
                      <tr>
                        <th>Breast Adjusted AJCC 6th N</th>
                        <td>{this.state.data.breast_adjusted_ajcc_6n}</td>
                      </tr>
                      <tr>
                        <th>Breast Adjusted AJCC 6th N</th>
                        <td>{this.state.data.breast_adjusted_ajcc_6t}</td>
                      </tr>
                      <tr>
                        <th>CS Lymph Nodes</th>
                        <td>{this.state.data.cs_lymph_nodes}</td>
                      </tr>
                      <tr>
                        <th>CS Lymph Nodes Eval</th>
                        <td>{this.state.data.cs_lymph_nodes_eval}</td>
                      </tr>
                      <tr>
                        <th>CS Mets at Dx</th>
                        <td>{this.state.data.cs_mets_at_dx}</td>
                      </tr>
                      <tr>
                        <th>CS Mets at Dx Bone</th>
                        <td>{this.state.data.cs_mets_at_dx_bone}</td>
                      </tr>
                      <tr>
                        <th>CS Mets at Dx Brain</th>
                        <td>{this.state.data.cs_mets_at_dx_brain}</td>
                      </tr>
                      <tr>
                        <th>CS Mets at Dx Liver</th>
                        <td>{this.state.data.cs_mets_at_dx_liver}</td>
                      </tr>
                      <tr>
                        <th>CS Mets at Dx Lung</th>
                        <td>{this.state.data.cs_mets_at_dx_lung}</td>
                      </tr>
                      <tr>
                        <th>CS Mets Eval</th>
                        <td>{this.state.data.cs_mets_eval}</td>
                      </tr>
                      <tr>
                        <th>CS Schema -AJCC 6th ed</th>
                        <td>{this.state.data.cs_schema_ajcc_6}</td>
                      </tr>
                      <tr>
                        <th>CS Schema v0204+</th>
                        <td>{this.state.data.cs_schema_v0204}</td>
                      </tr>
                      <tr>
                        <th>CS Tumor Size</th>
                        <td>{this.state.data.cs_tumor_size}</td>
                      </tr>
                      <tr>
                        <th>CS Tumor Size/Ext Eval</th>
                        <td>{this.state.data.cs_tumor_size_ext_eval}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC</th>
                        <td>{this.state.data.derived_ajcc}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 6th T</th>
                        <td>{this.state.data.derived_ajcc_6_m}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 6th N</th>
                        <td>{this.state.data.derived_ajcc_6_n}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 6th Stage Group</th>
                        <td>{this.state.data.derived_ajcc_6_stage_grp}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 6th T</th>
                        <td>{this.state.data.derived_ajcc_6_t}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 7th Stage Group</th>
                        <td>{this.state.data.derived_ajcc_7_stage_grp}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 7th M</th>
                        <td>{this.state.data.derived_ajcc_7m}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 7th N</th>
                        <td>{this.state.data.derived_ajcc_7n}</td>
                      </tr>
                      <tr>
                        <th>Derived AJCC 7th T</th>
                        <td>{this.state.data.derived_ajcc_7t}</td>
                      </tr>
                      <tr>
                        <th>Diagnostic Confirmation</th>
                        <td>{this.state.data.diagnostic_confirmation}</td>
                      </tr>
                      <tr>
                        <th>ER Status Recode Breast Cancer</th>
                        <td>
                          {this.state.data.er_status_recode_breast_cancer}
                        </td>
                      </tr>
                      <tr>
                        <th>First Malignant Primary Indicator</th>
                        <td>
                          {this.state.data.first_maligant_primary_indicator}
                        </td>
                      </tr>
                      <tr>
                        <th>Gender</th>
                        <td>{this.state.data.gender}</td>
                      </tr>
                      <tr>
                        <th>Grade</th>
                        <td>{this.state.data.grade}</td>
                      </tr>
                      <tr>
                        <th>Histology Recode—Brain Groupings</th>
                        <td>
                          {this.state.data.histology_recode_brain_groupings}
                        </td>
                      </tr>
                      <tr>
                        <th>Histology Recode—Broad Groupings</th>
                        <td>
                          {this.state.data.histology_recode_broad_groupings}
                        </td>
                      </tr>
                      <tr>
                        <th>Marital Status</th>
                        <td>{this.state.data.marital_status}</td>
                      </tr>
                      <tr>
                        <th>Month of Diagnosis</th>
                        <td>{this.state.data.month_of_diagnosis}</td>
                      </tr>
                      <tr>
                        <th>Origin recode NHIA (Hispanic, Non-Hisp)</th>
                        <td>{this.state.data.origin_recode_niha}</td>
                      </tr>
                      <tr>
                        <th>Patient Id</th>
                        <td>{this.state.data.patient_id}</td>
                      </tr>
                      <tr>
                        <th>Primary by International Rules</th>
                        <td>
                          {this.state.data.primary_by_internationals_rules}
                        </td>
                      </tr>
                      <tr>
                        <th>Primary Site</th>
                        <td>{this.state.data.primary_site}</td>
                      </tr>
                      <tr>
                        <th>Race</th>
                        <td>{this.state.data.race}</td>
                      </tr>
                      <tr>
                        <th>Reason for no Surgery</th>
                        <td>{this.state.data.reason_for_no_surgery}</td>
                      </tr>
                      <tr>
                        <th>Regional Nodes Examined</th>
                        <td>{this.state.data.regional_nodes_examined}</td>
                      </tr>
                      <tr>
                        <th>Regional Nodes Positive</th>
                        <td>{this.state.data.regional_nodes_positive}</td>
                      </tr>
                      <tr>
                        <th>RX Summ—Surg Prim Site</th>
                        <td>{this.state.data.rx_summ}</td>
                      </tr>
                      <tr>
                        <th>RX Summ—Scope Reg LN Sur</th>
                        <td>{this.state.data.rx_summ_scope_reg_ln_sur}</td>
                      </tr>
                      <tr>
                        <th>RX Summ—Surg Oth Reg/Dis</th>
                        <td>{this.state.data.rx_summ_surg_oth_reg_or_dis}</td>
                      </tr>
                      <tr>
                        <th>Sequence Number</th>
                        <td>{this.state.data.sequence_number}</td>
                      </tr>
                      <tr>
                        <th>Country</th>
                        <td>{this.state.data.country}</td>
                      </tr>
                      <tr>
                        <th>State County Recode</th>
                        <td>{this.state.data.state_county_recode}</td>
                      </tr>
                      <tr>
                        <th>Survival Months</th>
                        <td>
                          {this.state.data.survival_months}
                        </td>
                      </tr>
                      <tr>
                        <th>Total Number of Benign/Borderline Tumors</th>
                        <td>{this.state.data.total_benign_tumors}</td>
                      </tr>
                      <tr>
                        <th>Total Number of In Situ/malignant Tumors</th>
                        <td>{this.state.data.total_situ_tumors}</td>
                      </tr>
                      <tr>
                        <th>Tumor Marker 1</th>
                        <td>{this.state.data.tumor_marker_1}</td>
                      </tr>
                      <tr>
                        <th>Tumor Marker 2</th>
                        <td>{this.state.data.tumor_marker_2}</td>
                      </tr>
                      <tr>
                        <th>Tumor Marker 3</th>
                        <td>{this.state.data.tumor_marker_3}</td>
                      </tr>
                      <tr>
                        <th>Type of Reporting Source</th>
                        <td>{this.state.data.type_of_reporting_source}</td>
                      </tr>
                      <tr>
                        <th>Vital Status recode</th>
                        <td>{this.state.data.vital_status_code}</td>
                      </tr>
                      <tr>
                        <th>Year of Birth</th>
                        <td>{this.state.data.year_of_birth}</td>
                      </tr>
                      <tr>
                        <th>Year of Diagnosis</th>
                        <td>{this.state.data.year_of_diagnosis}</td>
                      </tr>
                      <tr>
                        <th>Others</th>
                        <td>{this.state.data.others}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>No medical records found, create one.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Records;
