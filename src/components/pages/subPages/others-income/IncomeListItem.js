import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Card } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { blue500 } from "material-ui/styles/colors";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";

import {
  startEditIncome,
  startRemoveIncome
} from "../../../../actions/others-income/income-actions";

const customDialogContentStyle = {
  width: "90%",
  maxWidth: "none",
  minHeight: "50%"
};

class IncomeListItem extends React.Component {
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     console.log("created At", createdAt);
  //     this.setState(() => ({ incomeDate: createdAt }));
  //   }
  // };
  handleConfirmPassword = event => {
    let password = event.target.value;
    this.setState({ password });
    if (String(password) === String(this.props.storeInfo.password)) {
      this.setState({ confirmButton: false });
    } else {
      this.setState({ confirmButton: true });
    }
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };
  closeEditIncomeModel = () => {
    this.setState({ showEditIncomeModel: false });
  };
  showEditIncomeModel = () => {
    this.setState({ showEditIncomeModel: true });
  };
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
    let { id, description, amount, createdAt, note } = props;
    this.state = {
      id: id,
      showEditIncomeModel: false,
      calendarFocused: false,
      submitDisable: true,
      incomeTitle: note ? note : "",
      incomeAmount: amount ? amount.toString() : "",
      incomeDate: createdAt ? moment(createdAt) : moment(),
      incomeDetails: description ? description : "",
      materialDate: null,
      confirmButton: true,
      password: "",
      open: false,
      singleItem: ""
    };
  }

  handleDelete = () => {
    this.closeEditIncomeModel();
    this.props.startRemoveIncome({ id: this.state.id });
    this.props.showSnackBar("Delete Successful !");
  };

  handleUpdate = () => {
    const income = {
      note: this.state.incomeTitle,
      description: this.state.incomeDetails,
      amount: parseFloat(this.state.incomeAmount, 10),
      createdAt: this.state.incomeDate.valueOf()
    };
    this.closeEditIncomeModel();
    this.props.startEditIncome(this.state.id, income);
    this.props.showSnackBar("Update Successful !");
  };

  handleMainEditModel = () => {
    this.handleClose();
    this.setState({ showEditIncomeModel: true });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Enter"
        disabled={this.state.confirmButton}
        primary={true}
        onClick={this.handleMainEditModel}
      />
    ];
    const DefaultActionsOfAddIncomeModel = [
      <FlatButton label="Cancel" onClick={this.closeEditIncomeModel} />,
      <FlatButton
        label="Delete"
        secondary={true}
        disabled={
          !this.state.incomeAmount ||
          !this.state.incomeTitle ||
          !this.state.incomeDate
            ? true
            : false
        }
        onClick={this.handleDelete}
      />,
      <FlatButton
        label="Update"
        primary={true}
        disabled={
          !this.state.incomeAmount ||
          !this.state.incomeTitle ||
          !this.state.incomeDate
            ? true
            : false
        }
        onClick={this.handleUpdate}
      />
    ];
    return (
      <div>
        <Card
          className="income-list-item"
          onClick={() => this.setState({ open: true })}
        >
          <div className="list-item">
            <div>
              <h3 className="list-item-title">{this.state.incomeTitle}</h3>
              <span className="list-item-sub-title">
                {moment(this.state.incomeDate).format("MMMM Do, YYYY")}
              </span>
            </div>
            <h3 className="list-item-data">
              {" "}
              {numeral(this.state.incomeAmount).format("0,0.00")} &#x9f3;
            </h3>
          </div>
        </Card>
        <Dialog
          title="Update/Remove Income"
          actions={DefaultActionsOfAddIncomeModel}
          modal={true}
          open={this.state.showEditIncomeModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
          contentStyle={customDialogContentStyle}
          autoDetectWindowHeight={false}
        >
          <div>
            <TextField
              onChange={this.handleIncomeTitleChange}
              value={this.state.incomeTitle}
              hintText="Income Title"
              floatingLabelText="Income Title Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />

            <TextField
              onChange={this.handleIncomeAmountChange}
              value={this.state.incomeAmount}
              type="number"
              hintText="Money / Amount"
              floatingLabelText="Income Amount Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />
            <br />
            <TextField
              onChange={this.handleIncomeDetailsChange}
              value={this.state.incomeDetails}
              hintText="Income Details(optional)"
              floatingLabelText="Income Details Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
              multiLine={true}
            />

            <div className="single-date-picker">
              {/* <label style={{ color: "orange" }}>Select Data</label>
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
                hintText={moment(this.props.createdAt).format("l")}
                value={this.state.materialDate}
                onChange={this.handleMaterialDateChange}
              />
            </div>
          </div>
        </Dialog>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          title="Password Please !"
          onRequestClose={this.handleClose}
        >
          <TextField
            type="password"
            floatingLabelText="Enter Password To Edit"
            value={this.state.password}
            onChange={this.handleConfirmPassword}
          />
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  startEditIncome: (id, income) => dispatch(startEditIncome(id, income)),
  startRemoveIncome: data => dispatch(startRemoveIncome(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeListItem);
