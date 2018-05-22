import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
// import Divider from "material-ui/Divider";
import numeral from "numeral";
import SvgIcon from "material-ui/SvgIcon";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import moment from "moment";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { connect } from "react-redux";
import noInternet from "no-internet";

import { startRemoveAnEntryToReadyCash } from "../../../../actions/ready-cash/ready-cash-actions";

class ReadyCashIncomeList extends Component {
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
      <p>
        <span style={{ color: "green" }}>
          <strong>{numeral(singleItem.amount).format("0,0.00")} &#x9f3;</strong>{" "}
        </span>
        &nbsp;From{" "}
        <SvgIcon style={{ width: 12, height: 12 }}>
          <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm3.85-4h1.64L21 16l-1.99 1.99c-1.31-.98-2.28-2.38-2.73-3.99-.18-.64-.28-1.31-.28-2s.1-1.36.28-2c.45-1.62 1.42-3.01 2.73-3.99L21 8l-1.51 2h-1.64c-.22.63-.35 1.3-.35 2s.13 1.37.35 2z" />
        </SvgIcon>{" "}
        <strong>{singleItem.number}</strong> Via{" "}
        <strong>{singleItem.category.toUpperCase()}</strong>
        <br />
        Memo Number:{" "}
        <span style={{ color: "blue" }}>{singleItem.memoNumber}</span> &nbsp;
        <span>Name: {singleItem.name} </span>
      </p>
    );
  };
  extractDate = data => {
    var now = moment(data).format("LTS");
    return now;
  };
  renderDetails = singleItem => {
    return (
      <p>
        <strong>
          E-mail: {singleItem.mail ? singleItem.mail : "Not Provided !"}&nbsp;Time:{" "}
          <span style={{ color: "orange" }}>
            {this.extractDate(singleItem.moment)}
          </span>
          <br />
          Address: {singleItem.address}
        </strong>
      </p>
    );
  };
  renderIncomeListItem = () => {
    return this.props.income.map((singleItem, index) => {
      if (singleItem.category === "others-income") {
        return (
          <ListItem
            key={index}
            primaryText={
              <span>
                <span style={{ color: "green" }}>
                  <strong>
                    {numeral(singleItem.amount).format("0,0.00")} &#x9f3;
                  </strong>
                </span>
                &nbsp;Via{" "}
                <strong>{singleItem.category.toUpperCase()}&nbsp;</strong>Time:{" "}
                <span style={{ color: "orange" }}>
                  {this.extractDate(singleItem.moment)}
                </span>
                <br />
              </span>
            }
            secondaryText={
              <span>
                Title: <strong>{singleItem.title}</strong>
              </span>
            }
            rightIconButton={
              <div
                style={{ marginRight: 10, marginTop: 10, cursor: "pointer" }}
              >
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
            secondaryTextLines={2}
          />
        );
      } else if (singleItem.category === "advance") {
        return (
          <ListItem
            key={index}
            primaryText={
              <p>
                <span style={{ color: "green" }}>
                  <strong>
                    {numeral(singleItem.amount).format("0,0.00")} &#x9f3;
                  </strong>{" "}
                </span>
                &nbsp;From{" "}
                <SvgIcon style={{ width: 12, height: 12 }}>
                  <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm3.85-4h1.64L21 16l-1.99 1.99c-1.31-.98-2.28-2.38-2.73-3.99-.18-.64-.28-1.31-.28-2s.1-1.36.28-2c.45-1.62 1.42-3.01 2.73-3.99L21 8l-1.51 2h-1.64c-.22.63-.35 1.3-.35 2s.13 1.37.35 2z" />
                </SvgIcon>{" "}
                <strong>{singleItem.title}</strong> Via{" "}
                <strong>{singleItem.category.toUpperCase()}</strong>
              </p>
            }
            secondaryText={
              <p>
                <strong>
                  Name: {singleItem.name} &nbsp;
                  <span style={{ color: "orange" }}>
                    {this.extractDate(singleItem.moment)}
                  </span>
                </strong>
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={
              <div
                style={{ marginRight: 10, marginTop: 10, cursor: "pointer" }}
              >
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
      } else {
        return (
          <ListItem
            key={index}
            primaryText={this.renderAmount(singleItem)}
            secondaryText={this.renderDetails(singleItem)}
            secondaryTextLines={2}
            rightIconButton={
              <div
                style={{ marginRight: 10, marginTop: 10, cursor: "pointer" }}
              >
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
      }
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
          title="Are You Sure? You want to remove this income entry?"
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
  ReadyCashIncomeList
);
