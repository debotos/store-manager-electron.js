import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

import { addBank } from "../../../../actions/bank-actions";
import AddBankImage from "../../../../../src/assets/images/bankAdd.ico";
import "../../../../style/Bank/bank.css";

class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      accountNumber: "",
      submitEnable: true
    };
  }

  checkAlreadyExist = () => {
    const Banks = this.props.banks;
    for (let bank of Banks) {
      if (bank.bank_account_number === this.state.accountNumber) {
        this.setState({ submitEnable: true });
        this.props.showSnackBar(`${this.state.accountNumber} account already exist !`)
      }
    }
  };

  handleBankName = event => {
    const bankName = event.target.value;
    this.setState({ bankName });
    if (bankName.length > 0 && this.state.accountNumber.length > 0) {
      this.setState({ submitEnable: false });
    } else {
      this.setState({ submitEnable: true });
    }
  };

  handleAccountNumber = event => {
    const getValue = event => {
      return new Promise((resolve, reject) => {
        const accountNumber = event.target.value;
        resolve(accountNumber);
      });
    };
    getValue(event)
      .then(value => {
        this.setState({ accountNumber: value });
        if (value.length > 0 && this.state.bankName.length > 0) {
          this.setState({ submitEnable: false });
        } else {
          this.setState({ submitEnable: true });
        }
        return value;
      })
      .then(() => {
        this.checkAlreadyExist();
      });
  };

  handleSubmit = event => {
    this.setState({ submitEnable: true });
    const bankName = this.state.bankName.trim();
    const accountNumber = this.state.accountNumber.trim();
    // console.log(`[AddBank.js] State is : ${bankName} ${accountNumber}`);
    // Now adding a bank
    this.props.addBank(bankName, accountNumber);
    this.props.showSnackBar(`${bankName} added Successfully !`);
    this.setState({ bankName: "", accountNumber: "" });
  };

  render() {
    return (
      <div>
        <Card className="bank-add-card">
          <CardHeader
            title="Add a Bank"
            subtitle="NOTE: Both required!"
            avatar={AddBankImage}
          />
          <TextField
            type="text"
            value={this.state.bankName}
            onChange={this.handleBankName}
            hintText="Bank Name Here"
            floatingLabelText="Bank Name Here"
          />
          <br />
          <TextField
            value={this.state.accountNumber}
            onChange={this.handleAccountNumber}
            hintText="Bank Account Number (unique!)"
            floatingLabelText="Bank Account Number (unique!)"
          />
          <CardActions>
            <RaisedButton
              onClick={this.handleSubmit}
              disabled={this.state.submitEnable}
              label="Add Bank"
              primary={true}
            />
          </CardActions>
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
    addBank: (name, account_number) => {
      dispatch(addBank(name, account_number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
