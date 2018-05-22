import React, { Component } from "react";
import SnackBar from "../ui-element/SnackBar";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";

import AppBarMain from "../ui-element/AppBarMain";
import View from "./subPages/stock/View";
import Add from "./subPages/stock/Add";
import InOut from "./subPages/stock/InOut";

const tabStyles = {
  slide: {
    padding: 10
  }
};

class Stock extends Component {
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
  handleTabChange = value => {
    this.setState({
      slideIndex: value
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      snackBarMessage: "",
      slideIndex: 0
    };
  }

  render() {
    return (
      <div>
        <AppBarMain title={"Stock"} />
        {/* TabBar Section */}
        <div>
          <Tabs onChange={this.handleTabChange} value={this.state.slideIndex}>
            <Tab label="View" value={0} />
            <Tab label="Add" value={1} />
            <Tab label="In/Out" value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleTabChange}
          >
            <div>
              <View showSnackBar={this.showSnackBar} />
            </div>
            <div>
              <Add showSnackBar={this.showSnackBar} />
            </div>
            <div style={tabStyles.slide}>
              <InOut showSnackBar={this.showSnackBar} />
            </div>
          </SwipeableViews>
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

export default Stock;
