import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Home";
  }

  render() {
    return <div>Sumanth</div>;
  }
}

export default Home;
