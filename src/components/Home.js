import React, { Component } from "react";
import "../css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Home";
    document.body.classList.add("white");
  }

  componentWillUnmount() {
    document.body.classList.remove("white");
  }

  render() {
    return <div>Welcome to MyContext</div>;
  }
}

export default Home;
