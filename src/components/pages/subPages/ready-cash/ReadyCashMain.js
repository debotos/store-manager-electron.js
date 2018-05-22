import React, { Component } from "react";
// import ReactCountdownClock from "react-countdown-clock";
import { Card, CardTitle } from "material-ui/Card";
import numeral from "numeral";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import SvgIcon from "material-ui/SvgIcon";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import TextField from "material-ui/TextField";
import SnackBar from "../../../ui-element/SnackBar";
import noInternet from "no-internet";

import AppBarMain from "../../../ui-element/AppBarMain";
import ReadyCashIncomeList from "./ReadyCashIncomeList";
import ReadyCashExpensesList from "./ReadyCashExpensesList";
import ReadyCashTotal from "./ReadyCashTotal";
// import { ExpenseList } from "../expenses/ExpensesList";
import { startResetReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";
import {
  startUpdateReadyCash,
  startOverrideReadyCash
} from "../../../../actions/ready-cash/ready-cash-amount-actions";
import GENERATE_PDF from "./PDF";
// import Navigation from "../Navigation";

class ReadyCashMain extends Component {
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
  handleOpen = () => {
    noInternet().then(offline => {
      if (offline) {
        // no internet
        this.showSnackBar("Failed ! No Internet Connection !");
      } else {
        // internet have
        this.setState({ open: true });
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };

  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      snackBarMessage: "",
      confirmButton: true,
      password: "",
      open: false,
      showEditReadyCash: false,
      overrideReadyCashAmount: this.props.readyCashAmount.amount
        ? parseFloat(parseFloat(this.props.readyCashAmount.amount).toFixed(2))
        : 0
    };
  }

  handleConfirmPassword = event => {
    let password = event.target.value;
    this.setState({ password });
    if (String(password) === String(this.props.storeInfo.password)) {
      this.setState({ confirmButton: false });
    } else {
      this.setState({ confirmButton: true });
    }
  };

  handleResetAllData = () => {
    this.handleClose();
    this.props.startResetReadyCash();
    this.props.startUpdateReadyCash(
      parseFloat(
        parseFloat(this.calculateIncomeTotal()) -
          parseFloat(this.calculateExpensesTotal())
      )
    );
    this.showSnackBar("Reset Data Successfull !");
  };
  calculateExpensesTotal = () => {
    let expensesTotal = 0;
    this.props.readyCash.expenses.forEach(singleItem => {
      expensesTotal = parseFloat(expensesTotal) + parseFloat(singleItem.amount);
    });
    return expensesTotal;
  };
  calculateIncomeTotal = () => {
    let incomeTotal = 0;
    this.props.readyCash.income.forEach(singleItem => {
      incomeTotal = parseFloat(incomeTotal) + parseFloat(singleItem.amount);
    });
    return incomeTotal;
  };
  handlePDFGenerate = () => {
    let dataForPDF = {
      entries: this.props.readyCash,
      storeInfo: this.props.storeInfo,
      previousReadyCash: this.props.readyCashAmount.amount,
      expensesTotal: this.calculateExpensesTotal(),
      incomeTotal: this.calculateIncomeTotal(),
      fromNowReadyCash:
        parseFloat(
          parseFloat(this.props.readyCashAmount.amount) +
            parseFloat(this.calculateIncomeTotal())
        ) - parseFloat(this.calculateExpensesTotal())
    };
    GENERATE_PDF(dataForPDF);
  };
  handleShowEditReadyCash = (event, toggled) => {
    this.setState({
      showEditReadyCash: toggled
    });
  };
  handleOverrideReadyCashAmount = event => {
    let amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ overrideReadyCashAmount: amount });
    }
  };
  handleReadyCashUpdate = () => {
    let amount = this.state.overrideReadyCashAmount;
    this.props.startOverrideReadyCash(amount);
    this.showSnackBar(
      <p style={{ color: "red" }}>Successfully Updated Ready Cash &#9786;</p>
    );
  };
  decideDisableOrNot = () => {
    if (
      this.props.readyCash.income.length > 0 ||
      this.props.readyCash.expenses.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Reset"
        disabled={this.state.confirmButton}
        secondary={true}
        onClick={this.handleResetAllData}
      />
    ];
    return (
      <div>
        <AppBarMain title={"Ready Cash"} />
        {/* Title Bar */}

        <Card
          className="animated slideInUp"
          style={{
            padding: 5
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <div>
              <div>
                <strong>
                  Previous Ready Cash{" "}
                  {numeral(
                    parseFloat(this.props.readyCashAmount.amount)
                  ).format("0,0.00")}{" "}
                  &#x9f3;
                </strong>
                <Toggle
                  onToggle={this.handleShowEditReadyCash}
                  defaultToggled={this.state.showEditReadyCash}
                />
                {this.state.showEditReadyCash && (
                  <div>
                    <TextField
                      type="number"
                      floatingLabelText="Override Ready Cash"
                      value={this.state.overrideReadyCashAmount}
                      onChange={this.handleOverrideReadyCashAmount}
                    />
                    <RaisedButton
                      onClick={this.handleReadyCashUpdate}
                      label="Update"
                      primary={true}
                      style={{ margin: 10 }}
                      icon={
                        <SvgIcon>
                          <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z" />
                        </SvgIcon>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <iframe
                src="https://free.timeanddate.com/clock/i61f8k1p/n942/fn14/ftb/tt0/tw1/tm3/tb2"
                frameBorder="0"
                width="192"
                height="18"
                title="Ready Cash Clock"
              />
            </div>
          </div>
        </Card>
        <br />
        {/* Main Section */}
        {this.props.readyCash.income.length > 0 ||
        this.props.readyCash.expenses.length > 0 ? (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6" style={{ marginBottom: 10 }}>
                  <Card className="animated slideInLeft">
                    <CardTitle
                      title="Income Section"
                      subtitle="Get all the list of today's Income"
                    />
                    <ReadyCashIncomeList
                      income={this.props.readyCash.income}
                      showSnackBar={this.showSnackBar}
                    />
                  </Card>
                </div>
                <div className="col-sm-6">
                  <Card className="animated slideInRight">
                    <CardTitle
                      title="Expenses Section"
                      subtitle="Get all the list of today's Expenses"
                    />
                    <ReadyCashExpensesList
                      expenses={this.props.readyCash.expenses}
                      showSnackBar={this.showSnackBar}
                    />
                  </Card>
                </div>
              </div>
            </div>
            <div className="container">
              <ReadyCashTotal
                readyCash={this.props.readyCash}
                readyCashAmount={this.props.readyCashAmount.amount}
              />
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <RaisedButton
                className="animated infinite tada"
                onClick={this.handlePDFGenerate}
                label="Save As PDF"
                primary={true}
                style={{ margin: 10 }}
                icon={
                  <SvgIcon>
                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                  </SvgIcon>
                }
                disabled={this.decideDisableOrNot()}
              />
              <RaisedButton
                onClick={this.handleOpen}
                label="Reset All Data"
                secondary={true}
                style={{ margin: 10 }}
                icon={
                  <SvgIcon>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgIcon>
                }
                disabled={this.decideDisableOrNot()}
              />
            </div>
          </div>
        ) : (
          <div style={{ color: "red", textAlign: "center", marginTop: 15 }}>
            <h4 className="animated infinite swing">
              Income and Expenses Is Empty !
            </h4>
          </div>
        )}

        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          title={
            <div style={{ color: "red" }}>
              Are You Sure? You Should Reset It Only After 24 Hour !
              (Warning...) Genetate The PDF First !
            </div>
          }
          onRequestClose={this.handleClose}
        >
          <TextField
            type="password"
            floatingLabelText="Comfirm The Password"
            value={this.state.password}
            onChange={this.handleConfirmPassword}
          />
        </Dialog>
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

const mapStateToProps = state => {
  return {
    readyCash: state.readyCash,
    readyCashAmount: state.readyCashAmount,
    storeInfo: state.storeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startResetReadyCash: () => {
      dispatch(startResetReadyCash());
    },
    startUpdateReadyCash: amount => {
      dispatch(startUpdateReadyCash(amount));
    },
    startOverrideReadyCash: amount => {
      dispatch(startOverrideReadyCash(amount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyCashMain);
