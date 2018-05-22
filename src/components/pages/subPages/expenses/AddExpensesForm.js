import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import moment from "moment";
// import { SingleDatePicker } from "react-dates";
// import { Card, CardActions } from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";

import { startAddExpense } from "../../../../actions/expenses/expenses-actions";
import { startAddAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";

class AddExpensesForm extends Component {
  handleReset = () => {
    this.setState({ expensesTitle: "" });
    this.setState({ expensesAmount: "" });
    this.setState({ expensesDetails: "" });
    this.setState({ showAddExpensesModel: false });
    this.setState({ expensesDate: moment() });
    this.setState({ materialDate: null });
  };
  handleSubmit = event => {
    const expense = {
      note: this.state.expensesTitle,
      description: this.state.expensesDetails,
      amount: parseFloat(this.state.expensesAmount, 10),
      createdAt: this.state.expensesDate.valueOf()
    };
    this.props.startAddExpense(expense);
    this.setState({ expensesTitle: "" });
    this.setState({ expensesAmount: "" });
    this.setState({ expensesDetails: "" });
    this.setState({ expensesDate: moment() });
    this.setState({ materialDate: null });
    this.props.showSnackBar("Successfully Added !");
    const dataForReadyCash = {
      type: "expenses",
      moment: moment().valueOf(),
      amount: parseFloat(this.state.expensesAmount, 10),
      title: this.state.expensesTitle,
      details: this.state.expensesDetails
    };
    this.props.startAddAnEntryToReadyCash(dataForReadyCash);
  };
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     this.setState(() => ({ expensesDate: createdAt }));
  //   }
  // };
  handleExpensesTitleChange = event => {
    const title = event.target.value;
    this.setState({ expensesTitle: title });
  };
  handleExpensesAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ expensesAmount: amount }));
    }
  };
  handleExpensesDetailsChange = event => {
    const details = event.target.value;
    this.setState({ expensesDetails: details });
  };
  handleMaterialDateChange = (event, date) => {
    console.log("====================================");
    console.log("Expenses Date: ", moment(date).valueOf());
    console.log("====================================");
    this.setState({ materialDate: date });
    this.setState(() => ({ expensesDate: moment(date) }));
    console.log("Date", date);
  };
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: false,
      submitDisable: true,
      showAddExpensesModel: false,
      expensesTitle: "",
      expensesAmount: "",
      expensesDate: moment(),
      expensesDetails: "",
      materialDate: null
    };
  }
  render() {
    return (
      <div>
        <div className="container" style={{ textAlign: "center" }}>
          <TextField
            autoFocus
            onChange={this.handleExpensesTitleChange}
            value={this.state.expensesTitle}
            hintText="Expenses Title"
            floatingLabelText="Expenses Title Here"
          />
          <TextField
            onChange={this.handleExpensesAmountChange}
            value={this.state.expensesAmount}
            type="number"
            hintText="Money / Amount"
            floatingLabelText="Expenses Amount Here"
          />
          <br />
          <textarea
            className="animated lightSpeedIn"
            style={{
              width: "70%",
              height: "100px",
              border: "3px solid #cccccc",
              padding: "5px",
              fontFamily: "Tahoma"
            }}
            onChange={this.handleExpensesDetailsChange}
            value={this.state.expensesDetails}
            placeholder="Expenses Details Here (optional) !"
          />
          <br />
          <div className="single-date-picker">
            {/* <label className="animated lightSpeedIn">
              Select Data [Default: <b>Today</b>]
            </label>
            <br />
            <SingleDatePicker
              date={this.state.expensesDate}
              numberOfMonths={1}
              onDateChange={this.onDateChange}
              isOutsideRange={() => false}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
            /> */}
            <DatePicker
              autoOk={true}
              hintText="Select Date [Default: Today]"
              value={this.state.materialDate}
              onChange={this.handleMaterialDateChange}
            />
          </div>

          <FlatButton
            label="Reset"
            secondary={true}
            disabled={
              !this.state.expensesAmount && !this.state.expensesTitle
                ? true
                : false
            }
            onClick={this.handleReset}
          />
          <FlatButton
            label="Add Expense"
            primary={true}
            disabled={
              !this.state.expensesAmount ||
              !this.state.expensesTitle ||
              !this.state.expensesDate
                ? true
                : false
            }
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startAddExpense: expense => {
      dispatch(startAddExpense(expense));
    },
    startAddAnEntryToReadyCash: data => {
      dispatch(startAddAnEntryToReadyCash(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddExpensesForm);
