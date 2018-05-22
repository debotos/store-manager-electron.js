import React, { Component } from "react";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";

import { removeBank } from "../../../../actions/bank-actions";
import RemoveBankImage from "../../../../../src/assets/images/bankRemove.jpg";
import "../../../../style/Bank/bank.css";

class RemoveBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_account_number: ""
    };
  }

  handleChange = (event, index, value) =>
    this.setState({ bank_account_number: value });

  handleBankDelete = event => {
    const account_number = this.state.bank_account_number;
    this.props.removeBank(account_number);
    this.props.showSnackBar(`Bank account ${account_number} Deleted`);
  };

  render() {
    return (
      <Card className="bank-remove-card">
        <CardHeader
          title="Remove a Bank"
          subtitle="select a bank to remove"
          avatar={RemoveBankImage}
        />

        {this.props.banks.length > 0 ? (
          <div>
            <SelectField
              value={
                this.state.bank_account_number === ""
                  ? ""
                  : this.state.bank_account_number
              }
              onChange={this.handleChange}
              floatingLabelText="Select A Bank"
              style={{ marginLeft: "30px" }}
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
            First add a Bank !
          </h3>
        )}

        <CardActions style={{ textAlign: "center" }}>
          <RaisedButton
            disabled={this.props.banks.length > 0 ? false : true}
            onClick={this.handleBankDelete}
            label="Remove Bank"
            secondary={true}
          />
        </CardActions>
      </Card>
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
    removeBank: account_number => {
      dispatch(removeBank(account_number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveBank);
