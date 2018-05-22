import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import moment from "moment";
// import { SingleDatePicker } from "react-dates";
// import { Card, CardActions } from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";

import { startAddIncome } from "../../../../actions/others-income/income-actions";
import { startAddAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";

class AddIncomeForm extends Component {
  handleReset = () => {
    this.setState({ incomeTitle: "" });
    this.setState({ incomeAmount: "" });
    this.setState({ incomeDetails: "" });
    this.setState({ showAddIncomeModel: false });
    this.setState({ incomeDate: moment() });
    this.setState({ materialDate: null });
  };

  handleSubmit = event => {
    const income = {
      note: this.state.incomeTitle,
      description: this.state.incomeDetails,
      amount: parseFloat(this.state.incomeAmount, 10),
      createdAt: this.state.incomeDate.valueOf()
    };
    this.props.startAddIncome(income);
    this.setState({ incomeTitle: "" });
    this.setState({ incomeAmount: "" });
    this.setState({ incomeDetails: "" });
    this.setState({ incomeDate: moment() });
    this.setState({ materialDate: null });
    this.props.showSnackBar("Successfully Added !");
    const dataForReadyCash = {
      type: "income",
      moment: moment().valueOf(),
      amount: parseFloat(this.state.incomeAmount, 10),
      title: this.state.incomeTitle,
      details: this.state.incomeDetails,
      category: "others-income"
    };
    this.props.startAddAnEntryToReadyCash(dataForReadyCash);
  };
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };

  handleIncomeTitleChange = event => {
    const title = event.target.value;
    this.setState({ incomeTitle: title });
  };
  handleIncomeAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ incomeAmount: amount }));
    }
  };
  handleIncomeDetailsChange = event => {
    const details = event.target.value;
    this.setState({ incomeDetails: details });
  };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     console.log(createdAt.valueOf());
  //     this.setState(() => ({ incomeDate: createdAt }));
  //   }
  // };
  handleMaterialDateChange = (event, date) => {
    console.log("====================================");
    console.log("Income Date: ", moment(date).valueOf());
    console.log("====================================");
    this.setState({ materialDate: date });
    this.setState(() => ({ incomeDate: moment(date) }));
    console.log("Date", date);
  };
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: false,
      submitDisable: true,
      showAddIncomeModel: false,
      incomeTitle: "",
      incomeAmount: "",
      incomeDate: moment(),
      incomeDetails: "",
      materialDate: null
    };
  }
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 10 }}
        >
          <TextField
            autoFocus
            onChange={this.handleIncomeTitleChange}
            value={this.state.incomeTitle}
            hintText="Income Title"
            floatingLabelText="Income Title Here"
          />
          <TextField
            onChange={this.handleIncomeAmountChange}
            value={this.state.incomeAmount}
            type="number"
            hintText="Money / Amount"
            floatingLabelText="Income Amount Here"
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
            onChange={this.handleIncomeDetailsChange}
            value={this.state.incomeDetails}
            placeholder="Income Details Here (optional) !"
          />
          <br />
          <div className="single-date-picker">
            {/* <label className="animated lightSpeedIn">
              Select Data [Default: <b>Today</b>]
            </label>
            <br />
            <SingleDatePicker
              date={this.state.incomeDate}
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
              !this.state.incomeAmount && !this.state.incomeTitle ? true : false
            }
            onClick={this.handleReset}
          />
          <FlatButton
            label="Add Income"
            primary={true}
            disabled={
              !this.state.incomeAmount ||
              !this.state.incomeTitle ||
              !this.state.incomeDate
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
    startAddIncome: income => {
      dispatch(startAddIncome(income));
    },
    startAddAnEntryToReadyCash: data => {
      dispatch(startAddAnEntryToReadyCash(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddIncomeForm);
