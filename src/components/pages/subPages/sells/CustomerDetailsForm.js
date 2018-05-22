import React, { Component } from "react";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import isEmail from "validator/lib/isEmail";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import numeral from "numeral";
import moment from "moment";
import SvgIcon from "material-ui/SvgIcon";
import noInternet from "no-internet";
import AutoComplete from "material-ui/AutoComplete";

import GENERATE_PDF from "./PDF";
import { startIncrementMemoNumber } from "../../../../actions/sells/memo-no-actions";
import { removeAllSellsItem } from "../../../../actions/sells/sells-actions";
import { startAddSellUnderCustomerHistory } from "../../../../actions/sells/sells-history-actions";
import {
  startAddPrevDue,
  startRemovePrevDue
} from "../../../../actions/sells/prevDue-actions";
import { removeAllTable } from "../../../../actions/sells/table-actions";
import { startAddAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";
import { startRemoveAdvance } from "../../../../actions/advance/advance-actions";

const uuidv4 = require("uuid/v4");

class CustomerDetailsForm extends Component {
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
    this.props.removeAllSellsItem();
    this.props.removeAllTable();
  };
  handleReset = () => {
    this.setState({ name: "" });
    this.setState({ number: "" });
    this.setState({ mail: "" });
    this.setState({ deposit: "" });
    this.setState({ address: "" });
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleMail = event => {
    const mail = event.target.value;
    this.setState({ mail });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };

  handleDeposit = event => {
    const deposit = event.target.value;
    if (!deposit || deposit.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ deposit });
    }
  };
  // handleNumber = event => {
  //   const number = event.target.value;
  //   if (!number || number.match(/^\d{1,}(\.\d{0})?$/)) {
  //     this.setState({ number });
  //   }
  // };
  userAlreadyExists = () => {
    const searchingFor = this.state.number;
    let flag = false;
    let prevDue = 0;
    this.props.due.forEach(singleItem => {
      if (singleItem.number.toString() === searchingFor.toString()) {
        console.log("Existing user");
        flag = true;
        prevDue = singleItem.amount;
      }
    });
    return [flag, prevDue];
  };
  handleUpdateInput = value => {
    this.setState({ number: value });
  };
  setOthersField = () => {
    let info;
    let amount;
    this.props.due.forEach(singleItem => {
      if (singleItem.number === this.state.number) {
        info = singleItem.info;
        amount = singleItem.amount;
      }
    });
    let advance = 0;
    this.props.advance.forEach(singleItem => {
      if (singleItem.note === this.state.number) {
        advance = singleItem.amount;
      }
    });
    if (info) {
      this.props.showSnackBar(
        `Found Due ${numeral(parseFloat(amount)).format(
          "0,0.00"
        )} Taka & Advance ${numeral(parseFloat(advance)).format("0,0.00")} Taka`
      );
      this.setState({ name: info.name });
      this.setState({ number: info.number });
      this.setState({ mail: info.mail });
      this.setState({ address: info.address });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      name: "",
      number: "",
      mail: "",
      address: "",
      deposit: "",
      allTotal: this.props.allTotal,
      modelData: "",
      dataSource: this.props.due.map(singleItem => {
        return singleItem.number;
      })
    };
  }
  collectSellsData = () => ({
    number: this.state.number,
    history: {
      id: uuidv4(),
      items: this.props.sellsTables,
      memoNumber: this.props.memoNumber,
      allTotal: this.props.allTotal,
      customer: {
        name: this.state.name,
        number: this.state.number,
        mail: this.state.mail,
        deposit: this.state.deposit,
        advance: this.userHaveAdvance()[1],
        prevDue: parseFloat(this.userAlreadyExists()[1]).toFixed(2),
        totalWithDue: parseFloat(
          parseFloat(this.props.allTotal.finalTotal) +
            parseFloat(this.userAlreadyExists()[1])
        ).toFixed(2),
        address: this.state.address,
        depositWithAdvance:
          parseFloat(this.userHaveAdvance()[1]) +
          parseFloat(this.state.deposit),
        allTotalWithPrevDue:
          parseFloat(this.props.allTotal.finalTotal) +
          parseFloat(this.userAlreadyExists()[1])
      }
    }
  });
  userHaveAdvance = () => {
    const searchingFor = this.state.number;
    let flag = false;
    let id;
    let prevAdvance = 0;
    let obj;
    this.props.advance.forEach(singleItem => {
      if (singleItem.note.toString() === searchingFor.toString()) {
        console.log("User Have Advance.");
        flag = true;
        id = singleItem.id;
        obj = singleItem;
        prevAdvance = singleItem.amount;
      }
    });
    return [flag, prevAdvance, id, obj];
  };
  //Final Work
  finalWork = () => {
    let allTotalWithPrevDue =
      parseFloat(this.props.allTotal.finalTotal) +
      parseFloat(this.userAlreadyExists()[1]);
    let depositWithAdvance =
      parseFloat(this.userHaveAdvance()[1]) + parseFloat(this.state.deposit);
    // if (parseFloat(allTotalWithPrevDue) >= parseFloat(depositWithAdvance)) {
    // This condition is not needed if i want to save deposit as new advance
    let deposit = parseFloat(this.state.deposit).toFixed(2);
    let newDue = (allTotalWithPrevDue - parseFloat(depositWithAdvance)).toFixed(
      2
    );

    if (parseFloat(allTotalWithPrevDue) === parseFloat(depositWithAdvance)) {
      //Remove both due and advance from database
      this.props.startRemoveAdvance({ id: this.userHaveAdvance()[2] });
      this.props.startRemovePrevDue(this.userAlreadyExists()[2]);
    } else {
      //Update the due database
      //remove the advance entry
      this.props.startAddPrevDue(this.state.number, newDue, {
        name: this.state.name,
        number: this.state.number,
        mail: this.state.mail,
        address: this.state.address
      });
      this.props.startRemoveAdvance({ id: this.userHaveAdvance()[2] });
    }

    //Saving History
    this.props.startAddSellUnderCustomerHistory(this.collectSellsData());

    //Data for showing model
    const modelData = {
      advance: this.userHaveAdvance()[1],
      allTotal: this.props.allTotal.finalTotal,
      prevDue: this.userAlreadyExists()[1],
      totalWithDue: allTotalWithPrevDue,
      depositNow: deposit,
      newDue
    };
    this.setState({ modelData });
    this.handleDialogOpen();

    const dataForPDF = {
      tables: this.props.sellsTables,
      customer: {
        name: this.state.name,
        number: this.state.number,
        mail: this.state.mail,
        address: this.state.address,
        allTotal: this.props.allTotal,
        prevDue: this.userAlreadyExists()[1],
        totalWithDue: allTotalWithPrevDue,
        depositNow: deposit,
        newDue,
        advance: this.userHaveAdvance()[1]
      },
      memoNumber: this.props.memoNumber,
      storeInfo: this.props.storeInfo
    };
    GENERATE_PDF(dataForPDF);

    const dataForReadyCash = {
      type: "income",
      moment: moment().valueOf(),
      amount: deposit,
      category: "sell",
      number: this.state.number,
      address: this.state.address,
      name: this.state.name,
      mail: this.state.mail,
      memoNumber: this.props.memoNumber
    };
    this.props.startAddAnEntryToReadyCash(dataForReadyCash);

    this.handleReset();
    this.props.startIncrementMemoNumber();
    // } else {
    //   this.props.showSnackBar(
    //     `Error![Advance Found: ${this.userHaveAdvance()[1].toFixed(
    //       2
    //     )} Taka] So, Validate your Deposit!`
    //   );
    // }
  };
  //End Final Work
  handleSaveAndGeneratePDF = () => {
    noInternet().then(offline => {
      if (offline) {
        // no internet
        this.props.showSnackBar("Failed ! No Internet Connection !");
      } else {
        // internet have
        if (this.state.mail) {
          if (isEmail(this.state.mail)) {
            this.finalWork();
          } else {
            this.props.showSnackBar("Error ! Invalid Email !");
          }
        } else {
          this.finalWork();
        }
      }
    });
  };
  showModelData = modelData => {
    const {
      advance,
      allTotal,
      prevDue,
      totalWithDue,
      depositNow,
      newDue
    } = this.state.modelData;

    return (
      <div>
        All Table Total: {numeral(parseFloat(allTotal)).format("0,0.00")}
        <br />
        <strong>Previous Due: </strong>
        <b style={{ color: "red" }}>
          {parseFloat(prevDue).toFixed(2) === parseFloat(0).toFixed(2)
            ? "No Previous Due"
            : numeral(parseFloat(prevDue)).format("0,0.00")}
        </b>
        <br />
        All Total + Previous Due:{" "}
        {numeral(parseFloat(totalWithDue)).format("0,0.00")}
        <br />
        <strong>Advance: </strong>
        <b style={{ color: "green" }}>
          {parseFloat(advance).toFixed(2) === parseFloat(0).toFixed(2)
            ? "No Previous Advance"
            : numeral(parseFloat(advance)).format("0,0.00")}
        </b>
        <br />
        Deposit Now: {numeral(parseFloat(depositNow)).format("0,0.00")}
        <br />
        Deposit Now + Previous Advance:{" "}
        {numeral(parseFloat(depositNow) + parseFloat(advance)).format("0,0.00")}
        <br />
        <strong>New Due From Now: </strong>
        <b style={{ color: "red" }}>
          {parseFloat(newDue).toFixed(2) === parseFloat(0).toFixed(2)
            ? "No Due"
            : numeral(parseFloat(newDue)).format("0,0.00")}
        </b>
        <br />
      </div>
    );
  };
  render() {
    const dialogActions = [
      <FlatButton
        label="Okey"
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];
    return (
      <div>
        <div className="container" style={{ marginTop: 10, marginBottom: 10 }}>
          <Card
            style={{
              padding: 40,
              backgroundColor: "#CFD8DC"
            }}
          >
            <h4 style={{ textAlign: "center" }}>
              <b>Input Customer Details :</b>
            </h4>
            {/* All Fields */}
            <AutoComplete
              type="number"
              value={this.state.number}
              hintText="Phone Number"
              floatingLabelText="Phone (Unique) "
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.setOthersField}
            />
            <TextField
              value={this.state.name}
              onChange={this.handleName}
              hintText="Name here"
              floatingLabelText="Place the Customer Name "
            />

            <TextField
              type="number"
              value={this.state.deposit}
              onChange={this.handleDeposit}
              hintText="Deposit"
              floatingLabelText="Deposit Amount"
            />

            <TextField
              type="mail"
              value={this.state.mail}
              onChange={this.handleMail}
              hintText="E-mail Address"
              floatingLabelText="Email Address Here"
            />
            <br />
            <TextField
              value={this.state.address}
              onChange={this.handleAddress}
              hintText="Address here"
              floatingLabelText="Place the Address "
            />

            <FlatButton
              disabled={
                this.state.name ||
                this.state.number ||
                this.state.mail ||
                this.state.address
                  ? false
                  : true
              }
              secondary={true}
              label="Reset"
              onClick={this.handleReset}
            />
            <FlatButton
              className="animated infinite tada"
              disabled={
                this.state.name &&
                this.state.number &&
                this.state.address &&
                this.state.deposit
                  ? false
                  : true
              }
              primary={true}
              label="Save & Get PDF"
              icon={
                <SvgIcon>
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                </SvgIcon>
              }
              onClick={this.handleSaveAndGeneratePDF}
            />
          </Card>
        </div>
        <Dialog
          title="Addetional Information:"
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
        >
          {this.showModelData()}
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startAddSellUnderCustomerHistory: data => {
      dispatch(startAddSellUnderCustomerHistory(data));
    },
    startAddPrevDue: (number, amount, info) => {
      dispatch(startAddPrevDue(number, amount, info));
    },
    startRemovePrevDue: id => dispatch(startRemovePrevDue(id)),
    startIncrementMemoNumber: () => {
      dispatch(startIncrementMemoNumber());
    },
    removeAllSellsItem: () => {
      dispatch(removeAllSellsItem());
    },
    removeAllTable: () => {
      dispatch(removeAllTable());
    },
    startAddAnEntryToReadyCash: data => {
      dispatch(startAddAnEntryToReadyCash(data));
    },
    startRemoveAdvance: data => dispatch(startRemoveAdvance(data))
  };
};

const mapStateToProps = state => {
  return {
    sellsTables: state.sellsTable,
    sellsHistory: state.sellsHistory,
    due: state.due,
    memoNumber: state.memoNumber.memoNumber,
    storeInfo: state.storeInfo,
    advance: state.advance
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CustomerDetailsForm
);
