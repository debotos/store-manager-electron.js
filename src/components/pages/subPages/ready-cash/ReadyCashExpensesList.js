import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
// import Divider from "material-ui/Divider";
import numeral from "numeral";
import moment from "moment";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SvgIcon from "material-ui/SvgIcon";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import noInternet from "no-internet";

import { startRemoveAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";

class ReadyCashExpensesList extends Component {
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };

  constructor(props) {
    super(props);
    this.state = {
      confirmButton: true,
      password: "",
      open: false,
      singleItem: ""
    };
  }

  renderAmount = singleItem => {
    return (
      <span>
        <span style={{ color: "green" }}>
          <strong>{numeral(singleItem.amount).format("0,0.00")} &#x9f3;</strong>
        </span>
        &nbsp;Time:{" "}
        <span style={{ color: "orange" }}>
          {this.extractDate(singleItem.moment)}
        </span>
        <br />
      </span>
    );
  };
  extractDate = data => {
    var now = moment(data).format("LTS");
    return now;
  };
  renderIncomeListItem = () => {
    return this.props.expenses.map((singleItem, index) => {
      return (
        <ListItem
          key={index}
          primaryText={this.renderAmount(singleItem)}
          secondaryText={
            <span>
              Title: <strong>{singleItem.title}</strong>
            </span>
          }
          rightIconButton={
            <div style={{ marginRight: 20, marginTop: 4, cursor: "pointer" }}>
              <FloatingActionButton
                mini={true}
                secondary={true}
                onClick={() => this.handleOpen(singleItem)}
              >
                <SvgIcon>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                </SvgIcon>
              </FloatingActionButton>
            </div>
          }
        />
      );
    });
  };
  handleOpen = singleItem => {
    noInternet().then(offline => {
      if (offline) {
        // no internet
        this.showSnackBar("Failed ! No Internet Connection !");
      } else {
        // internet have
        this.setState({ singleItem });
        this.setState({ open: true });
      }
    });
  };
  handleDelete = () => {
    this.handleListItemDelete(
      this.state.singleItem.id,
      this.state.singleItem.type
    );
  };
  handleListItemDelete = (id, type) => {
    this.handleClose();
    noInternet().then(offline => {
      if (offline) {
        // no internet
        this.props.showSnackBar("Failed ! No Internet Connection !");
      } else {
        // internet have
        this.props.startRemoveAnEntryToReadyCash(id, type);
        this.props.showSnackBar("Successfully Deleted !");
        this.setState({ password: "" });
      }
    });
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
  render() {
    const actions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Delete"
        disabled={this.state.confirmButton}
        primary={true}
        onClick={this.handleDelete}
      />
    ];
    return (
      <div>
        <List>{this.renderIncomeListItem()}</List>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          title="Are You Sure? You want to remove this expense entry?"
          onRequestClose={this.handleClose}
        >
          <TextField
            type="password"
            floatingLabelText="Comfirm The Password"
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

const mapDispatchToProps = dispatch => {
  return {
    startRemoveAnEntryToReadyCash: (id, type) => {
      dispatch(startRemoveAnEntryToReadyCash(id, type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ReadyCashExpensesList
);
