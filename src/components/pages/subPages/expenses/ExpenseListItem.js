import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Card } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { blue500 } from "material-ui/styles/colors";
import { connect } from "react-redux";
// import { SingleDatePicker } from "react-dates";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";

import {
  startEditExpense,
  startRemoveExpense
} from "../../../../actions/expenses/expenses-actions";

const customDialogContentStyle = {
  width: "90%",
  maxWidth: "none",
  minHeight: "50%"
};

class ExpenseListItem extends React.Component {
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     console.log("created At", createdAt);
  //     this.setState(() => ({ expensesDate: createdAt }));
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
  closeEditExpensesModel = () => {
    this.setState({ showEditExpensesModel: false });
  };
  showEditExpensesModel = () => {
    this.setState({ showEditExpensesModel: true });
  };
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
    let { id, description, amount, createdAt, note } = props;
    this.state = {
      id: id,
      showEditExpensesModel: false,
      calendarFocused: false,
      submitDisable: true,
      expensesTitle: note ? note : "",
      expensesAmount: amount ? amount.toString() : "",
      expensesDate: createdAt ? moment(createdAt) : moment(),
      expensesDetails: description ? description : "",
      materialDate: null,
      confirmButton: true,
      password: "",
      open: false,
      singleItem: ""
    };
  }

  handleDelete = () => {
    this.closeEditExpensesModel();
    this.props.startRemoveExpense({ id: this.state.id });
    this.props.showSnackBar("Delete Successful !");
  };

  handleUpdate = () => {
    const expense = {
      note: this.state.expensesTitle,
      description: this.state.expensesDetails,
      amount: parseFloat(this.state.expensesAmount, 10),
      createdAt: this.state.expensesDate.valueOf()
    };
    this.closeEditExpensesModel();
    this.props.startEditExpense(this.state.id, expense);
    this.props.showSnackBar("Update Successful !");
  };
  handleMainEditModel = () => {
    this.handleClose();
    this.setState({ showEditExpensesModel: true });
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
    const DefaultActionsOfAddExpensesModel = [
      <FlatButton label="Cancel" onClick={this.closeEditExpensesModel} />,
      <FlatButton
        label="Delete"
        secondary={true}
        disabled={
          !this.state.expensesAmount ||
          !this.state.expensesTitle ||
          !this.state.expensesDate
            ? true
            : false
        }
        onClick={this.handleDelete}
      />,
      <FlatButton
        label="Update"
        primary={true}
        disabled={
          !this.state.expensesAmount ||
          !this.state.expensesTitle ||
          !this.state.expensesDate
            ? true
            : false
        }
        onClick={this.handleUpdate}
      />
    ];
    return (
      <div>
        <Card
          className="expenses-list-item"
          onClick={() => this.setState({ open: true })}
        >
          <div className="list-item">
            <div>
              <h3 className="list-item-title">{this.state.expensesTitle}</h3>
              <span className="list-item-sub-title">
                {moment(this.state.expensesDate).format("MMMM Do, YYYY")}
              </span>
            </div>
            <h3 className="list-item-data">
              {" "}
              {numeral(this.state.expensesAmount).format("0,0.00")} &#x9f3;
            </h3>
          </div>
        </Card>
        <Dialog
          title="Update/Remove Expense"
          actions={DefaultActionsOfAddExpensesModel}
          modal={true}
          open={this.state.showEditExpensesModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
          contentStyle={customDialogContentStyle}
          autoDetectWindowHeight={false}
        >
          <div>
            <TextField
              onChange={this.handleExpensesTitleChange}
              value={this.state.expensesTitle}
              hintText="Expenses Title"
              floatingLabelText="Expenses Title Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />

            <TextField
              onChange={this.handleExpensesAmountChange}
              value={this.state.expensesAmount}
              type="number"
              hintText="Money / Amount"
              floatingLabelText="Expenses Amount Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />
            <br />
            <TextField
              onChange={this.handleExpensesDetailsChange}
              value={this.state.expensesDetails}
              hintText="Expenses Details(optional)"
              floatingLabelText="Expenses Details Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
              multiLine={true}
            />

            <div className="single-date-picker">
              {/* <label style={{ color: "orange" }}>Select Data</label>
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
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListItem);
