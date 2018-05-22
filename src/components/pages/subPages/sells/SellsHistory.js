import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { Card } from "material-ui/Card";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

import HistoryTableGenerator from "./HistoryTable/HistoryTableGenerator";
import { startDeleteAllHistoryOfThisNumber } from "../../../../actions/sells/sells-history-actions";

class SellsHistory extends Component {
  handleSelectChange = (event, index, value) => {
    this.setState({ selectValue: value });
    this.setState({ showDeleteButton: true });
  };
  makeMenuItemsByHistoyObject = () => {
    const history = this.props.sellsHistory;
    const customerNumbers = [];
    let objectSize = Object.keys(history).length;
    if (objectSize > 0) {
      for (let number in history) {
        customerNumbers.push(number);
      }
    }
    return customerNumbers.map((singleItem, index) => {
      return (
        <MenuItem key={index} value={singleItem} primaryText={singleItem} />
      );
    });
  };
  handleFullHistoryDeleteConfirmDialogOpen = () => {
    this.setState({ fullHistoryDeleteConfirm: true });
  };

  handleFullHistoryDeleteConfirmDialogClose = () => {
    this.setState({ fullHistoryDeleteConfirm: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };
  handleConfirmPassword = event => {
    let password = event.target.value;
    this.setState({ password });
    if (String(password) === String(this.props.storeInfo.password)) {
      this.setState({ confirmButton: false });
    } else {
      this.setState({ confirmButton: true });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      selectValue: null,
      confirmButton: true,
      password: "",
      fullHistoryDeleteConfirm: false,
      idOfTheVictiom: "",
      showDeleteButton: false
    };
  }
  renderTableUsingHistory = phone => {
    const searchingFor = phone;
    const history = this.props.sellsHistory;
    let objectSize = Object.keys(history).length;

    let flag = false;
    let historyINeed;
    if (objectSize > 0 && phone) {
      for (let numberKey in history) {
        if (numberKey.toString() === searchingFor.toString()) {
          flag = true;
          historyINeed = history[numberKey];
        }
      }
    }
    if (flag) {
      return <HistoryTableGenerator allTables={historyINeed.history} />;
    }
  };
  handleAllDelete = () => {
    this.props.startDeleteAllHistoryOfThisNumber(
      this.state.idOfTheVictiom,
      this.state.selectValue
    );
    this.setState({ showDeleteButton: false });
    this.handleFullHistoryDeleteConfirmDialogClose();
  };
  showModelAndGetIdOfTheNumber = () => {
    // Now Get The Id
    let idOfTheVictiom = this.props.sellsHistory[this.state.selectValue].id;
    // Set State
    this.setState({ idOfTheVictiom });
    // Show Confirm
    this.handleFullHistoryDeleteConfirmDialogOpen();
  };

  renderAllHistoryDeleteButton = () => {
    if (this.state.showDeleteButton) {
      return (
        <div
          className="container"
          style={{
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <Card
            style={{
              backgroundColor: "#e5e5e5",
              padding: 10
            }}
          >
            <RaisedButton
              secondary={true}
              label="Delete All History Of This Number"
              fullWidth={true}
              onClick={this.showModelAndGetIdOfTheNumber}
            />
          </Card>
        </div>
      );
    }
  };
  render() {
    const fullHistoryDeleteConfirmModelActions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleFullHistoryDeleteConfirmDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        disabled={this.state.confirmButton}
        onClick={this.handleAllDelete}
      />
    ];
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          {Object.keys(this.props.sellsHistory).length > 0 ? (
            <div>
              <Card
                className="animated bounceIn"
                style={{ backgroundColor: "#90A4AE" }}
              >
                <SelectField
                  style={{ marginTop: 5 }}
                  hintText="Select Customer"
                  value={this.state.selectValue}
                  onChange={this.handleSelectChange}
                >
                  {this.makeMenuItemsByHistoyObject()}
                </SelectField>
              </Card>
            </div>
          ) : (
            <div style={{ color: "red", fontWeight: "bold" }}>
              No Sells History Found !
            </div>
          )}
        </div>
        {this.renderAllHistoryDeleteButton()}
        {/* Showing the tables */}
        <div>{this.renderTableUsingHistory(this.state.selectValue)}</div>
        <div>
          <Dialog
            actions={fullHistoryDeleteConfirmModelActions}
            modal={false}
            title="Are you Sure ? Removing All Sells History Of this Customer !!"
            open={this.state.fullHistoryDeleteConfirm}
            onRequestClose={this.handleFullHistoryDeleteConfirmDialogClose}
          >
            <TextField
              type="password"
              floatingLabelText="Comfirm The Password"
              value={this.state.password}
              onChange={this.handleConfirmPassword}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellsHistory: state.sellsHistory,
    storeInfo: state.storeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startDeleteAllHistoryOfThisNumber: (id, number) => {
      dispatch(startDeleteAllHistoryOfThisNumber(id, number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellsHistory);
