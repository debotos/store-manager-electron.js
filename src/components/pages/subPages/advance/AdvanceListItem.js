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
  startEditAdvance,
  startRemoveAdvance
} from "../../../../actions/advance/advance-actions";

const customDialogContentStyle = {
  width: "90%",
  maxWidth: "none",
  minHeight: "50%"
};

class AdvanceListItem extends React.Component {
  // onFocusChange = ({ focused }) => {
  //   this.setState(() => ({ calendarFocused: focused }));
  // };
  // onDateChange = createdAt => {
  //   if (createdAt) {
  //     console.log("created At", createdAt);
  //     this.setState(() => ({ advanceDate: createdAt }));
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
  closeEditAdvanceModel = () => {
    this.setState({ showEditAdvanceModel: false });
  };
  showEditAdvanceModel = () => {
    this.setState({ showEditAdvanceModel: true });
  };
  handleAdvanceTitleChange = event => {
    const title = event.target.value;
    this.setState({ advanceTitle: title });
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
    let { id, description, amount, createdAt, note } = props;
    this.state = {
      id: id,
      showEditAdvanceModel: false,
      calendarFocused: false,
      submitDisable: true,
      advanceTitle: note ? note : "",
      advanceAmount: amount ? amount.toString() : "",
      advanceDate: createdAt ? moment(createdAt) : moment(),
      advanceDetails: description ? description : "",
      materialDate: null,
      confirmButton: true,
      password: "",
      open: false,
      singleItem: ""
    };
  }

  handleDelete = () => {
    this.closeEditAdvanceModel();
    this.props.startRemoveAdvance({ id: this.state.id });
    this.props.showSnackBar("Delete Successful !");
  };

  handleUpdate = () => {
    const advance = {
      note: this.state.advanceTitle,
      description: this.state.advanceDetails,
      amount: parseFloat(this.state.advanceAmount, 10),
      createdAt: this.state.advanceDate.valueOf()
    };
    this.closeEditAdvanceModel();
    this.props.startEditAdvance(this.state.id, advance);
    this.props.showSnackBar("Update Successful !");
  };

  handleMainEditModel = () => {
    this.handleClose();
    this.setState({ showEditAdvanceModel: true });
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
    const DefaultActionsOfAddAdvanceModel = [
      <FlatButton label="Cancel" onClick={this.closeEditAdvanceModel} />,
      <FlatButton
        label="Delete"
        secondary={true}
        disabled={
          !this.state.advanceAmount ||
          !this.state.advanceTitle ||
          !this.state.advanceDate
            ? true
            : false
        }
        onClick={this.handleDelete}
      />,
      <FlatButton
        label="Update"
        primary={true}
        disabled={
          !this.state.advanceAmount ||
          !this.state.advanceTitle ||
          !this.state.advanceDate
            ? true
            : false
        }
        onClick={this.handleUpdate}
      />
    ];
    return (
      <div>
        <Card
          className="advance-list-item"
          onClick={() => this.setState({ open: true })}
        >
          <div className="list-item">
            <div>
              <h3 className="list-item-title">{this.state.advanceTitle}</h3>
              <span className="list-item-sub-title">
                {moment(this.state.advanceDate).format("MMMM Do, YYYY")}
              </span>
            </div>
            <h3 className="list-item-data">
              {" "}
              {numeral(this.state.advanceAmount).format("0,0.00")} &#x9f3;
            </h3>
          </div>
        </Card>
        <Dialog
          title="Update/Remove Advance"
          actions={DefaultActionsOfAddAdvanceModel}
          modal={true}
          open={this.state.showEditAdvanceModel}
          autoScrollBodyContent={true}
          repositionOnUpdate={false}
          contentStyle={customDialogContentStyle}
          autoDetectWindowHeight={false}
        >
          <div>
            <TextField
              onChange={this.handleAdvanceTitleChange}
              value={this.state.advanceTitle}
              hintText="Phone Number"
              type="number"
              floatingLabelText="Provide Phone Number"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />

            <TextField
              onChange={this.handleAdvanceAmountChange}
              value={this.state.advanceAmount}
              type="number"
              hintText="Money / Amount"
              floatingLabelText="Advance Amount Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
            />
            <br />
            <TextField
              onChange={this.handleAdvanceDetailsChange}
              value={this.state.advanceDetails}
              hintText="Advance Details(optional)"
              floatingLabelText="Advance Details Here"
              floatingLabelStyle={{ color: blue500 }}
              floatingLabelFocusStyle={{ color: blue500 }}
              multiLine={true}
            />

            <div className="single-date-picker">
              {/* <label style={{ color: "orange" }}>Select Data</label>
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
  startEditAdvance: (id, advance) => dispatch(startEditAdvance(id, advance)),
  startRemoveAdvance: data => dispatch(startRemoveAdvance(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceListItem);
