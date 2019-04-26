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

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    document.title = "Create Medical Record";
    document.body.classList.add("white");
  }

  componentWillUnmount() {
    document.body.classList.remove("white");
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    self.setState({ loading: true });

    var url = "http://localhost:9000/record/addRecord";

    var payload = {
      token: localStorage.getItem("access-token"),
      name: this.state.name,
      price: this.state.price,
      age_at_diagnosis: this.state.age_at_diagnosis,
      behavior_code: this.state.behavior_code,
      behavior_recode_for_analysis: this.state.behavior_recode_for_analysis,
      breast_adjusted_ajcc_6_stage: this.state.breast_adjusted_ajcc_6_stage,
      breast_adjusted_ajcc_6m: this.state.breast_adjusted_ajcc_6m,
      breast_adjusted_ajcc_6n: this.state.breast_adjusted_ajcc_6n,
      breast_adjusted_ajcc_6t: this.state.breast_adjusted_ajcc_6t,
      cs_lymph_nodes: this.state.cs_lymph_nodes,
      cs_lymph_nodes_eval: this.state.cs_lymph_nodes_eval,
      cs_mets_at_dx: this.state.cs_mets_at_dx,
      cs_mets_at_dx_bone: this.state.cs_mets_at_dx_bone,
      cs_mets_at_dx_brain: this.state.cs_mets_at_dx_brain,
      cs_mets_at_dx_liver: this.state.cs_mets_at_dx_liver,
      cs_mets_at_dx_lung: this.state.cs_mets_at_dx_lung,
      cs_mets_eval: this.state.cs_mets_eval,
      cs_schema_ajcc_6: this.state.cs_schema_ajcc_6,
      cs_schema_v0204: this.state.cs_schema_v0204,
      cs_tumor_size: this.state.cs_tumor_size,
      cs_tumor_size_ext_eval: this.state.cs_tumor_size_ext_eval,
      derived_ajcc: this.state.derived_ajcc,
      derived_ajcc_6_m: this.state.derived_ajcc_6_m,
      derived_ajcc_6_n: this.state.derived_ajcc_6_n,
      derived_ajcc_6_stage_grp: this.state.derived_ajcc_6_stage_grp,
      derived_ajcc_6_t: this.state.derived_ajcc_6_t,
      derived_ajcc_7_stage_grp: this.state.derived_ajcc_7_stage_grp,
      derived_ajcc_7m: this.state.derived_ajcc_7m,
      derived_ajcc_7n: this.state.derived_ajcc_7n,
      derived_ajcc_7t: this.state.derived_ajcc_7t,
      diagnostic_confirmation: this.state.diagnostic_confirmation,
      er_status_recode_breast_cancer: this.state.er_status_recode_breast_cancer,
      first_maligant_primary_indicator: this.state
        .first_maligant_primary_indicator,
      gender: this.state.gender,
      grade: this.state.grade,
      histology_recode_brain_groupings: this.state
        .histology_recode_brain_groupings,
      histology_recode_broad_groupings: this.state
        .histology_recode_broad_groupings,
      marital_status: this.state.marital_status,
      month_of_diagnosis: this.state.month_of_diagnosis,
      origin_recode_niha: this.state.origin_recode_niha,
      patient_id: this.state.patient_id,
      primary_by_internationals_rules: this.state
        .primary_by_internationals_rules,
      reason_for_no_surgery: this.state.reason_for_no_surgery,
      regional_nodes_examined: this.state.regional_nodes_examined,
      regional_nodes_positive: this.state.regional_nodes_positive,
      rx_summ: this.state.rx_summ,
      rx_summ_scope_reg_ln_sur: this.state.rx_summ_scope_reg_ln_sur,
      rx_summ_surg_oth_reg_or_dis: this.state.rx_summ_surg_oth_reg_or_dis,
      sequence_number: this.state.sequence_number,
      country: this.state.country,
      state_county_recode: this.state.state_county_recode,
      survival_months: this.state.survival_months,
      total_benign_tumors: this.state.total_benign_tumors,
      total_situ_tumors: this.state.total_situ_tumors,
      tumor_marker_1: this.state.tumor_marker_1,
      tumor_marker_2: this.state.tumor_marker_2,
      tumor_marker_3: this.state.tumor_marker_3,
      type_of_reporting_source: this.state.type_of_reporting_source,
      vital_status_code: this.state.vital_status_code,
      year_of_birth: this.state.year_of_birth,
      year_of_diagnosis: this.state.year_of_diagnosis
    };

    axios
      .post(url, payload)
      .then(function(response) {
        if (response.data.success) {
          self.props.history.push("/add");
          ToastsStore.success("Record created successfully.");
        } else {
          self.setState({ loading: false });
          ToastsStore.error(response.data.message);
        }
      })
      .catch(function(error) {
        self.setState({ loading: false });
        ToastsStore.error("Something went wrong!");
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
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
                <SideBar current="add" />
              </nav>
              <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-60">
                <h3 className="text-center">Add Medical Record</h3>
                <hr />
                <div className="row">
                  <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mtb">
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
                          type="text"
                          id="inputPrice"
                          className="form-control"
                          placeholder="Price"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="inputPrice">Price</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="age_at_diagnosis"
                          className="form-control"
                          placeholder="Age at Diagnosis"
                          name="age_at_diagnosis"
                          value={this.state.age_at_diagnosis}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="age_at_diagnosis">
                          Age at Diagnosis
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="behavior_code"
                          className="form-control"
                          placeholder="Behavior Code ICD"
                          name="behavior_code"
                          value={this.state.behavior_code}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="behavior_code">Behavior Code ICD</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="behavior_recode_for_analysis"
                          className="form-control"
                          placeholder="Behavior Recode for Analysis"
                          name="behavior_recode_for_analysis"
                          value={this.state.behavior_recode_for_analysis}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="behavior_recode_for_analysis">
                          Behavior Recode for Analysis
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="breast_adjusted_ajcc_6_stage"
                          className="form-control"
                          placeholder="Breast Adjusted AJCC 6th Stage"
                          name="breast_adjusted_ajcc_6_stage"
                          value={this.state.breast_adjusted_ajcc_6_stage}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="breast_adjusted_ajcc_6_stage">
                          Breast Adjusted AJCC 6th Stage
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="breast_adjusted_ajcc_6m"
                          className="form-control"
                          placeholder="Breast Adjusted AJCC 6th M"
                          name="breast_adjusted_ajcc_6m"
                          value={this.state.breast_adjusted_ajcc_6m}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="breast_adjusted_ajcc_6m">
                          Breast Adjusted AJCC 6th M
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="breast_adjusted_ajcc_6n"
                          className="form-control"
                          placeholder="Breast Adjusted AJCC 6th N"
                          name="breast_adjusted_ajcc_6n"
                          value={this.state.breast_adjusted_ajcc_6n}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="breast_adjusted_ajcc_6n">
                          Breast Adjusted AJCC 6th N
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="breast_adjusted_ajcc_6t"
                          className="form-control"
                          placeholder="Breast Adjusted AJCC 6th T"
                          name="breast_adjusted_ajcc_6t"
                          value={this.state.breast_adjusted_ajcc_6t}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="breast_adjusted_ajcc_6t">
                          Breast Adjusted AJCC 6th T
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_lymph_nodes"
                          className="form-control"
                          placeholder="CS Lymph Nodes"
                          name="cs_lymph_nodes"
                          value={this.state.cs_lymph_nodes}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_lymph_nodes">CS Lymph Nodes</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_lymph_nodes_eval"
                          className="form-control"
                          placeholder="CS Lymph Nodes Eval"
                          name="cs_lymph_nodes_eval"
                          value={this.state.cs_lymph_nodes_eval}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_lymph_nodes_eval">
                          CS Lymph Nodes Eval
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_at_dx"
                          className="form-control"
                          placeholder="CS Mets at Dx"
                          name="cs_mets_at_dx"
                          value={this.state.cs_mets_at_dx}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_at_dx">CS Mets at Dx</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_at_dx_bone"
                          className="form-control"
                          placeholder="CS Mets at Dx Bone"
                          name="cs_mets_at_dx_bone"
                          value={this.state.cs_mets_at_dx_bone}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_at_dx_bone">
                          CS Mets at Dx Bone
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_at_dx_brain"
                          className="form-control"
                          placeholder="CS Mets at Dx Brain"
                          name="cs_mets_at_dx_brain"
                          value={this.state.cs_mets_at_dx_brain}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_at_dx_brain">
                          CS Mets at Dx Brain
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_at_dx_liver"
                          className="form-control"
                          placeholder="CS Mets at Dx Liver"
                          name="cs_mets_at_dx_liver"
                          value={this.state.cs_mets_at_dx_liver}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_at_dx_liver">
                          CS Mets at Dx Liver
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_at_dx_lung"
                          className="form-control"
                          placeholder="CS Mets at Dx Lung"
                          name="cs_mets_at_dx_lung"
                          value={this.state.cs_mets_at_dx_lung}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_at_dx_lung">
                          CS Mets at Dx Lung
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_mets_eval"
                          className="form-control"
                          placeholder="CS Mets Eval"
                          name="cs_mets_eval"
                          value={this.state.cs_mets_eval}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_mets_eval">CS Mets Eval</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_schema_ajcc_6"
                          className="form-control"
                          placeholder="CS Schema -AJCC 6th ed"
                          name="cs_schema_ajcc_6"
                          value={this.state.cs_schema_ajcc_6}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_schema_ajcc_6">
                          CS Schema -AJCC 6th ed
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_schema_v0204"
                          className="form-control"
                          placeholder="CS Schema v0204+"
                          name="cs_schema_v0204"
                          value={this.state.cs_schema_v0204}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_schema_v0204">
                          CS Schema v0204+
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_tumor_size"
                          className="form-control"
                          placeholder="CS Tumor Size"
                          name="cs_tumor_size"
                          value={this.state.cs_tumor_size}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_tumor_size">CS Tumor Size</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="cs_tumor_size_ext_eval"
                          className="form-control"
                          placeholder="CS Tumor Size/Ext Eval"
                          name="cs_tumor_size_ext_eval"
                          value={this.state.cs_tumor_size_ext_eval}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="cs_tumor_size_ext_eval">
                          CS Tumor Size/Ext Eval
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc"
                          className="form-control"
                          placeholder="Derived AJCC"
                          name="derived_ajcc"
                          value={this.state.derived_ajcc}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc">Derived AJCC</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_6_m"
                          className="form-control"
                          placeholder="Derived AJCC 6th T"
                          name="derived_ajcc_6_m"
                          value={this.state.derived_ajcc_6_m}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_6_m">
                          Derived AJCC 6th T
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_6_n"
                          className="form-control"
                          placeholder="Derived AJCC 6th N"
                          name="derived_ajcc_6_n"
                          value={this.state.derived_ajcc_6_n}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_6_n">
                          Derived AJCC 6th N
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_6_stage_grp"
                          className="form-control"
                          placeholder="Derived AJCC 6th Stage Group"
                          name="derived_ajcc_6_stage_grp"
                          value={this.state.derived_ajcc_6_stage_grp}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_6_stage_grp">
                          Derived AJCC 6th Stage Group
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_6_t"
                          className="form-control"
                          placeholder="Derived AJCC 6th T"
                          name="derived_ajcc_6_t"
                          value={this.state.derived_ajcc_6_t}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_6_t">
                          Derived AJCC 6th T
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_7_stage_grp"
                          className="form-control"
                          placeholder="Derived AJCC 7th Stage Group"
                          name="derived_ajcc_7_stage_grp"
                          value={this.state.derived_ajcc_7_stage_grp}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_7_stage_grp">
                          Derived AJCC 7th Stage Group
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_7m"
                          className="form-control"
                          placeholder="Derived AJCC 7th M"
                          name="derived_ajcc_7m"
                          value={this.state.derived_ajcc_7m}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_7m">
                          Derived AJCC 7th M
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_7n"
                          className="form-control"
                          placeholder="Derived AJCC 7th N"
                          name="derived_ajcc_7n"
                          value={this.state.derived_ajcc_7n}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_7n">
                          Derived AJCC 7th N
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="derived_ajcc_7t"
                          className="form-control"
                          placeholder="Derived AJCC 7th T"
                          name="derived_ajcc_7t"
                          value={this.state.derived_ajcc_7t}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="derived_ajcc_7t">
                          Derived AJCC 7th T
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="diagnostic_confirmation"
                          className="form-control"
                          placeholder="Diagnostic Confirmation"
                          name="diagnostic_confirmation"
                          value={this.state.diagnostic_confirmation}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="diagnostic_confirmation">
                          Diagnostic Confirmation
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="er_status_recode_breast_cancer"
                          className="form-control"
                          placeholder="ER Status Recode Breast Cancer"
                          name="er_status_recode_breast_cancer"
                          value={this.state.er_status_recode_breast_cancer}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="er_status_recode_breast_cancer">
                          ER Status Recode Breast Cancer
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="first_maligant_primary_indicator"
                          className="form-control"
                          placeholder="First Malignant Primary Indicator"
                          name="first_maligant_primary_indicator"
                          value={this.state.first_maligant_primary_indicator}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="first_maligant_primary_indicator">
                          First Malignant Primary Indicator
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="gender"
                          className="form-control"
                          placeholder="Gender"
                          name="gender"
                          value={this.state.gender}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="gender">Gender</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="grade"
                          className="form-control"
                          placeholder="Grade"
                          name="grade"
                          value={this.state.grade}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="grade">Grade</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="histology_recode_brain_groupings"
                          className="form-control"
                          placeholder="Histology Recode—Brain Groupings"
                          name="histology_recode_brain_groupings"
                          value={this.state.histology_recode_brain_groupings}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="histology_recode_brain_groupings">
                          Histology Recode—Brain Groupings
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="histology_recode_broad_groupings"
                          className="form-control"
                          placeholder="Histology Recode—Broad Groupings"
                          name="histology_recode_broad_groupings"
                          value={this.state.histology_recode_broad_groupings}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="histology_recode_broad_groupings">
                          Histology Recode—Broad Groupings
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="marital_status"
                          className="form-control"
                          placeholder="Marital Status"
                          name="marital_status"
                          value={this.state.marital_status}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="marital_status">Marital Status</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="month_of_diagnosis"
                          className="form-control"
                          placeholder="Month of Diagnosis"
                          name="month_of_diagnosis"
                          value={this.state.month_of_diagnosis}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="month_of_diagnosis">
                          Month of Diagnosis
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="origin_recode_niha"
                          className="form-control"
                          placeholder="Origin recode NHIA (Hispanic, Non-Hisp)"
                          name="origin_recode_niha"
                          value={this.state.origin_recode_niha}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="origin_recode_niha">
                          Origin recode NHIA (Hispanic, Non-Hisp)
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="patient_id"
                          className="form-control"
                          placeholder="Patient Id"
                          name="patient_id"
                          value={this.state.patient_id}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="patient_id">Patient Id</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="primary_by_internationals_rules"
                          className="form-control"
                          placeholder="Primary by International Rules"
                          name="primary_by_internationals_rules"
                          value={this.state.primary_by_internationals_rules}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="primary_by_internationals_rules">
                          Primary by International Rules
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="primary_site"
                          className="form-control"
                          placeholder="Primary Site"
                          name="primary_site"
                          value={this.state.primary_site}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="primary_site">Primary Site</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="reason_for_no_surgery"
                          className="form-control"
                          placeholder="Reason for no Surgery"
                          name="reason_for_no_surgery"
                          value={this.state.reason_for_no_surgery}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="reason_for_no_surgery">
                          Reason for no Surgery
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="regional_nodes_examined"
                          className="form-control"
                          placeholder="Regional Nodes Examined"
                          name="regional_nodes_examined"
                          value={this.state.regional_nodes_examined}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="regional_nodes_examined">
                          Regional Nodes Examined
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="regional_nodes_positive"
                          className="form-control"
                          placeholder="Regional Nodes Positive"
                          name="regional_nodes_positive"
                          value={this.state.regional_nodes_positive}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="regional_nodes_positive">
                          Regional Nodes Positive
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="rx_summ"
                          className="form-control"
                          placeholder="RX Summ—Surg Prim Site"
                          name="rx_summ"
                          value={this.state.rx_summ}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="rx_summ">RX Summ—Surg Prim Site</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="rx_summ_scope_reg_ln_sur"
                          className="form-control"
                          placeholder="RX Summ—Scope Reg LN Sur"
                          name="rx_summ_scope_reg_ln_sur"
                          value={this.state.rx_summ_scope_reg_ln_sur}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="rx_summ_scope_reg_ln_sur">
                          RX Summ—Scope Reg LN Sur
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="rx_summ_surg_oth_reg_or_dis"
                          className="form-control"
                          placeholder="RX Summ—Surg Oth Reg/Dis"
                          name="rx_summ_surg_oth_reg_or_dis"
                          value={this.state.rx_summ_surg_oth_reg_or_dis}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="rx_summ_surg_oth_reg_or_dis">
                          RX Summ—Surg Oth Reg/Dis
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="sequence_number"
                          className="form-control"
                          placeholder="Sequence Number"
                          name="sequence_number"
                          value={this.state.sequence_number}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="sequence_number">Sequence Number</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="country"
                          className="form-control"
                          placeholder="Country"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="country">Country</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="state_county_recode"
                          className="form-control"
                          placeholder="State County Recode"
                          name="state_county_recode"
                          value={this.state.state_county_recode}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="state_county_recode">
                          State County Recode
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="survival_months"
                          className="form-control"
                          placeholder="Survival Months"
                          name="survival_months"
                          value={this.state.survival_months}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="survival_months">Survival Months</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="total_benign_tumors"
                          className="form-control"
                          placeholder="Total Number of Benign/Borderline Tumors"
                          name="total_benign_tumors"
                          value={this.state.total_benign_tumors}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="total_benign_tumors">
                          Total Number of Benign/Borderline Tumors
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="total_situ_tumors"
                          className="form-control"
                          placeholder="Total Number of In Situ/malignant Tumors"
                          name="total_situ_tumors"
                          value={this.state.total_situ_tumors}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="total_situ_tumors">
                          Total Number of In Situ/malignant Tumors
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="tumor_marker_1"
                          className="form-control"
                          placeholder="Tumor Marker 1"
                          name="tumor_marker_1"
                          value={this.state.tumor_marker_1}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="tumor_marker_1">Tumor Marker 1</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="tumor_marker_2"
                          className="form-control"
                          placeholder="Tumor Marker 2"
                          name="tumor_marker_2"
                          value={this.state.tumor_marker_2}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="tumor_marker_2">Tumor Marker 2</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="tumor_marker_3"
                          className="form-control"
                          placeholder="Tumor Marker 3"
                          name="tumor_marker_3"
                          value={this.state.tumor_marker_3}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="tumor_marker_3">Tumor Marker 3</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="type_of_reporting_source"
                          className="form-control"
                          placeholder="Type of Reporting Source"
                          name="type_of_reporting_source"
                          value={this.state.type_of_reporting_source}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="type_of_reporting_source">
                          Type of Reporting Source
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="vital_status_code"
                          className="form-control"
                          placeholder="Vital Status recode"
                          name="vital_status_code"
                          value={this.state.vital_status_code}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="vital_status_code">
                          Vital Status recode
                        </label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="year_of_birth"
                          className="form-control"
                          placeholder="Year of Birth"
                          name="year_of_birth"
                          value={this.state.year_of_birth}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="year_of_birth">Year of Birth</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="text"
                          id="year_of_diagnosis"
                          className="form-control"
                          placeholder="Year of Diagnosis"
                          name="year_of_diagnosis"
                          value={this.state.year_of_diagnosis}
                          onChange={this.handleChange}
                          required
                        />
                        <label htmlFor="year_of_diagnosis">
                          Year of Diagnosis
                        </label>
                      </div>

                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase mb-4"
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
        )}
      </React.Fragment>
    );
  }
}

export default AddRecord;
