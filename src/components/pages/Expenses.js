import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import SnackBar from "../ui-element/SnackBar";

import "../../style/expenses/expenses.css";
import AppBarMain from "../ui-element/AppBarMain";
import AddExpensesForm from "./subPages/expenses/AddExpensesForm";
import ExpenseDashboardPage from "./subPages/expenses/ExpensesDashboardPage";

class Expenses extends Component {
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
      tabSlideIndex: value
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      snackBarMessage: "",
      tabSlideIndex: 0
    };
  }

  render() {
    return (
      <div>
        <AppBarMain title={"Expenses"} />
        <h1 className="animated flip" style={{ textAlign: "center" }}>
          EXPENSES RECORD
        </h1>
        <div>
          <div style={{ marginTop: 10 }}>
            <Tabs
              className="container"
              onChange={this.handleTabChange}
              value={this.state.tabSlideIndex}
            >
              <Tab label="Expenses List" value={0} />
              <Tab label="Add Expenses" value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.tabSlideIndex}
              onChangeIndex={this.handleTabChange}
            >
              <div>
                <ExpenseDashboardPage showSnackBar={this.showSnackBar} />
              </div>
              <div>
                <AddExpensesForm showSnackBar={this.showSnackBar} />
              </div>
            </SwipeableViews>
          </div>
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

export default Expenses;
