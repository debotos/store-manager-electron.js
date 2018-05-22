import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "material-ui/Snackbar";

import AppBarMain from "../ui-element/AppBarMain";
import AddBank from "./subPages/Bank/AddBank";
import RemoveBank from "./subPages/Bank/RemoveBank";
import DepositWithdraw from "./subPages/Bank/DepositWithdraw";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      snackBar: false,
      snackBarMessage: ""
    };
  }
  // SnackBar Functions
  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.setState({
      snackBar: false
    });
  };
  // End
  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };
  render() {
    return (
      <div>
        <AppBarMain title={"Bank"} />
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Manage your Bank </h1>
          <div>
            <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
              <Tab label="D / W" value={0} />
              <Tab label="Add Bank" value={1} />
              <Tab label="Remove Bank" value={2} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <div>
                <DepositWithdraw showSnackBar={this.showSnackBar} />
              </div>
              <div style={styles.slide}>
                <AddBank showSnackBar={this.showSnackBar} />
              </div>
              <div style={styles.slide}>
                <RemoveBank showSnackBar={this.showSnackBar} />
              </div>
            </SwipeableViews>
          </div>
        </div>
        <Snackbar
          open={this.state.snackBar}
          message={<b>{this.state.snackBarMessage}</b>}
          action="Okey"
          onActionTouchTap={this.handleActionTouchTap}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Bank;
