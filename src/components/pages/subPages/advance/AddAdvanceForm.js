import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SvgIcon from "material-ui/SvgIcon";
import { connect } from "react-redux";
import moment from "moment";
import AutoComplete from "material-ui/AutoComplete";
// import { SingleDatePicker } from "react-dates";
// import { Card, CardActions } from "material-ui/Card";
import DatePicker from "material-ui/DatePicker";

import { startAddAdvance } from "../../../../actions/advance/advance-actions";
import { startAddAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";
import GENERATE_PDF from "./PDF";

class AddAdvanceForm extends Component {
  handleReset = () => {
    this.setState({ advanceTitle: "" });
    this.setState({ advanceAmount: "" });
    this.setState({ advanceDetails: "" });
    this.setState({ showAddAdvanceModel: false });
    this.setState({ advanceDate: moment() });
    this.setState({ materialDate: null });
    this.setState({ advanceName: "" });
  };

  handleSubmit = event => {
    const advance = {
      note: this.state.advanceTitle,
      description: this.state.advanceDetails,
      amount: parseFloat(this.state.advanceAmount, 10),
      createdAt: this.state.advanceDate.valueOf()
    };
    let flag = true;
    this.props.advance.map(singleItem => {
      if (singleItem.note.toString() === this.state.advanceTitle.toString()) {
        flag = false;
      }
    });
    if (flag) {
      this.props.startAddAdvance(advance);
      this.setState({ advanceTitle: "" });
      this.refs.autoCompleteInput.setState({ searchText: "" });
      this.setState({ advanceAmount: "" });
      this.setState({ advanceDetails: "" });
      this.setState({ advanceDate: moment() });
      this.setState({ materialDate: null });
      this.setState({ advanceName: "" });
      this.props.showSnackBar("Successfully Added !");
      const dataForReadyCash = {
        type: "income",
        moment: moment().valueOf(),
        amount: parseFloat(this.state.advanceAmount, 10),
        title: this.state.advanceTitle,
        name: this.state.advanceName,
        details: this.state.advanceDetails,
        category: "advance"
      };
      this.props.startAddAnEntryToReadyCash(dataForReadyCash);
      let dataForPDF = {
        name: this.state.advanceName,
        number: this.state.advanceTitle,
        amount: this.state.advanceAmount,
        details: this.state.advanceDetails,
        storeInfo: this.props.storeInfo
      };
      GENERATE_PDF(dataForPDF);
    } else {
      this.props.showSnackBar("Number Exists!! Use Edit or Update Function!");
    }
  };
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };

  // handleAdvanceTitleChange = event => {
  //   const title = event.target.value;
  //   this.setState({ advanceTitle: title });
  // };
  handleAdvanceNameChange = event => {
    const name = event.target.value;
    this.setState({ advanceName: name });
  };
  handleAdvanceAmountChange = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ advanceAmount: amount }));
    }
  };
  handleAdvanceDetailsChange = event => {
    const details = event.target.value;
    this.setState({ advanceDetails: details });
  };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     console.log(createdAt.valueOf());
  //     this.setState(() => ({ advanceDate: createdAt }));
  //   }
  // };
  handleMaterialDateChange = (event, date) => {
    console.log("====================================");
    console.log("Advance Date: ", moment(date).valueOf());
    console.log("====================================");
    this.setState({ materialDate: date });
    this.setState(() => ({ advanceDate: moment(date) }));
    console.log("Date", date);
  };
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: false,
      submitDisable: true,
      showAddAdvanceModel: false,
      advanceTitle: "",
      advanceAmount: "",
      advanceDate: moment(),
      advanceDetails: "",
      materialDate: null,
      advanceName: "",
      dataSource: this.props.due.map(singleItem => {
        return singleItem.number;
      })
    };
  }
  handleUpdateInput = value => {
    this.setState({ advanceTitle: value });
  };
  setOthersField = () => {
    let info;
    this.props.due.forEach(singleItem => {
      if (singleItem.number === this.state.advanceTitle) {
        info = singleItem.info;
      }
    });
    if (info) {
      this.setState({ advanceName: info.name });
    }
  };
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 10 }}
        >
          <AutoComplete
            autoFocus
            type="number"
            ref="autoCompleteInput"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            value={this.state.advanceTitle}
            onNewRequest={this.setOthersField}
            hintText="Phone Number"
            floatingLabelText="Provide Phone Number"
          />
          <TextField
            onChange={this.handleAdvanceNameChange}
            type="text"
            value={this.state.advanceName}
            hintText="Name"
            floatingLabelText="Provide Name"
          />
          <TextField
            onChange={this.handleAdvanceAmountChange}
            value={this.state.advanceAmount}
            type="number"
            hintText="Money / Amount"
            floatingLabelText="Advance Amount Here"
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
            onChange={this.handleAdvanceDetailsChange}
            value={this.state.advanceDetails}
            placeholder="Advance Details Here (optional) !"
          />
          <br />
          <div className="single-date-picker">
            {/* <label className="animated lightSpeedIn">
              Select Data [Default: <b>Today</b>]
            </label>
            <br />
            <SingleDatePicker
              date={this.state.advanceDate}
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
              !this.state.advanceAmount &&
              !this.state.advanceTitle &&
              !this.state.advanceName
                ? true
                : false
            }
            onClick={this.handleReset}
          />
          <FlatButton
            label="Add Advance"
            primary={true}
            disabled={
              !this.state.advanceAmount ||
              !this.state.advanceTitle ||
              !this.state.advanceName ||
              !this.state.advanceDate
                ? true
                : false
            }
            icon={
              <SvgIcon>
                <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
              </SvgIcon>
            }
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    due: state.due,
    storeInfo: state.storeInfo,
    advance: state.advance
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startAddAdvance: advance => {
      dispatch(startAddAdvance(advance));
    },
    startAddAnEntryToReadyCash: data => {
      dispatch(startAddAnEntryToReadyCash(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdvanceForm);
