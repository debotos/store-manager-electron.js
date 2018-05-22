import React, { Component } from "react";

import ReadyCashMain from "./subPages/ready-cash/ReadyCashMain";
import ReadyCashSplash from "./subPages/ready-cash/ReadyCashSplash";
import "../../style/ready-cash/splash-screen.css";

class ReadyCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderSplashscreen: true
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ renderSplashscreen: false }), 1000);
  }
  render() {
    if (this.state.renderSplashscreen) {
      return (
        <div className="ready-cash-splash-screen">
          <ReadyCashSplash />
        </div>
      );
    }
    return (
      <div>
        <ReadyCashMain />
      </div>
    );
  }
}

export default ReadyCash;
