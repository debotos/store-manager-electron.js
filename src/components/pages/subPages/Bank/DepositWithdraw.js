import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import BankImage from "../../../../../src/assets/images/bankMoney.ico";
import "../../../../style/Bank/bank.css";
import {
  depositMoneyToBankAccount,
  withdrawMoneyFromBankAccount
} from "../../../../actions/bank-actions";

class DepositWithdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_account_number: "",
      amount: "",
      balance: ""
    };
    this.getBalance();
  }

  handleDeposit = event => {
    const bank_account_number = this.state.bank_account_number;
    const amount = this.state.amount;
    console.log("amount sending", this.state.amount);
    this.props.depositMoneyToBankAccount(bank_account_number, amount);
    this.getBalance();
    this.setState({ amount: "" });
    this.props.showSnackBar("Amount deposit Successfull !");
  };

  handleWithdraw = event => {
    const bank_account_number = this.state.bank_account_number;
    const amount = parseFloat(this.state.amount);
    const balance = parseFloat(this.state.balance);
    if (balance >= amount) {
      this.props.withdrawMoneyFromBankAccount(bank_account_number, amount);
      this.getBalance();
      this.setState({ amount: "" });
      this.props.showSnackBar("Amount Withdraw Successfull !");
    } else {
      this.props.showSnackBar("Failed ! Not Enough Balance !");
    }
  };

  handleAmount = event => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  handleChange = (event, index, value) => {
    const setBankAccountToState = val => {
      return new Promise((resolve, reject) => {
        resolve(val);
      });
    };
    setBankAccountToState(value)
      .then(val => {
        this.setState({ bank_account_number: val });
      })
      .then(() => {
        this.getBalance();
      });
  };

  getBalance = () => {
    const account_number = this.state.bank_account_number;
    let balance;
    const getBalanceNow = account_number => {
      return new Promise((resolve, reject) => {
        if (account_number !== "") {
          const banks = this.props.banks;
          for (let bank of banks) {
            if (bank.hasOwnProperty("bank_account_number")) {
              if (bank["bank_account_number"] === account_number) {
                balance = bank["amount"];
                resolve(balance);
              }
            }
          }
        }
      });
    };

    getBalanceNow(account_number).then(balance => {
      this.setState({ balance });
    });
  };

  render() {
    return (
      <div>
        <Card className="balance-card">
          <h3>
            Balance:{" "}
            {this.state.balance !== "" &&
            this.state.balance !== "undefined" &&
            this.props.banks.length > 0 ? (
              <strong>{this.state.balance} &#x9f3;</strong>
            ) : (
              <b style={{ color: "red" }}>Select Account !</b>
            )}
          </h3>
        </Card>
        <Card className="deposit-withdraw-card">
          <CardHeader
            title="select bank for Balance"
            subtitle="Then do your actions"
            avatar={BankImage}
          />

          <div className="deposit-withdraw-inner-card">
            {this.props.banks.length > 0 ? (
              <div>
                <SelectField
                  value={
                    this.state.bank_account_number === ""
                      ? ""
                      : this.state.bank_account_number
                  }
                  floatingLabelText="Select A Bank"
                  onChange={this.handleChange}
                >
                  {this.props.banks.map(bank => {
                    return (
                      <MenuItem
                        key={bank.bank_account_number}
                        value={bank.bank_account_number}
                        label={bank.bank_account_number}
                        primaryText={bank.bank_name}
                      />
                    );
                  })}
                </SelectField>
              </div>
            ) : (
              <h3 style={{ color: "red", textAlign: "center" }}>
                <b>First add a Bank !</b>
              </h3>
            )}
            <TextField
              type="number"
              value={this.state.amount}
              disabled={this.props.banks.length > 0 ? false : true}
              onChange={this.handleAmount}
              hintText="Amount here to Add or Remove"
              floatingLabelText="Amount here to Add or Remove"
            />
            <CardActions style={{ textAlign: "center" }}>
              <RaisedButton
                disabled={
                  this.props.banks.length > 0 && this.state.amount !== ""
                    ? false
                    : true
                }
                onClick={this.handleDeposit}
                label="Deposit"
                primary={true}
              />
              <RaisedButton
                disabled={
                  this.props.banks.length > 0 &&
                  this.state.amount !== "" &&
                  parseInt(this.state.balance, 10) > 0
                    ? false
                    : true
                }
                onClick={this.handleWithdraw}
                label="Withdraw"
                secondary={true}
              />
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    banks: state.bank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    depositMoneyToBankAccount: (account_number, amount) => {
      dispatch(depositMoneyToBankAccount(account_number, amount));
    },
    withdrawMoneyFromBankAccount: (account_number, amount) => {
      dispatch(withdrawMoneyFromBankAccount(account_number, amount));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithdraw);
