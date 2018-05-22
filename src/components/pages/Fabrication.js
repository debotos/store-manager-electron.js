import React, { Component } from "react";
import SnackBar from "../ui-element/SnackBar";

import AppBarMain from "../ui-element/AppBarMain";
import Form from "./subPages/fabrication/Form";
// import "../../style/fabrication/fabrication.css";

class Fabrication extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End
  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      snackBarMessage: ""
    };
  }
  render() {
    return (
      <div className="fabrication-main-container">
        <AppBarMain title={"Fabrication"} />
        <div className="container">
          <Form showSnackBar={this.showSnackBar} />
        </div>
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Fabrication;
