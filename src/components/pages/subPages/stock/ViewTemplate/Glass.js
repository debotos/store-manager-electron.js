import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import numeral from "numeral";

import { startRemoveItemToStock } from "../../../../../actions/stock/stock-action";

class Glass extends Component {
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };
  componentDidUpdate = () => {
    if (
      JSON.stringify(this.props.values) !== JSON.stringify(this.state.glass)
    ) {
      this.setState({ glass: this.props.values });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      confirmButton: true,
      password: "",
      glass: this.props.values
    };
  }
  handleDelete = () => {
    this.handleClose();
    this.props.startRemoveItemToStock(
      this.state.glass.productCategoryToSell,
      this.state.glass.id
    );
    this.props.showSnackBar("Successfully Deleted !");
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
      <FlatButton label="No" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Yes"
        secondary={true}
        disabled={this.state.confirmButton}
        onClick={this.handleDelete}
      />
    ];
    return (
      <div>
        <Card
          className="animated bounceInLeft"
          style={{
            backgroundColor: "#CFD8DC"
          }}
        >
          <CardHeader
            title={this.state.glass.productCode}
            subtitle="Glass Category"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            Code: <strong>{this.state.glass.productCode}</strong> <br />
            Name: <strong>{this.state.glass.productName}</strong> <br />
            SFT:{" "}
            <span style={{ color: "blue" }}>
              <strong>{this.state.glass.sft}</strong>
            </span>{" "}
            <br />
            Rate: <strong>{this.state.glass.rate}</strong>
            <br />
            Amount (Quantity x Rate):{" "}
            <span style={{ color: "green" }}>
              <strong>
                {numeral(
                  parseFloat(
                    parseFloat(this.state.glass.sft) *
                      parseFloat(this.state.glass.rate)
                  )
                ).format("0,0.00")}{" "}
                &#x9f3;
              </strong>
            </span>{" "}
          </CardText>

          <CardActions>
            <RaisedButton
              secondary={true}
              onClick={this.handleOpen}
              label="Remove From Stock"
            />
          </CardActions>
        </Card>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          title="Warning! You want to Delete?"
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
    startRemoveItemToStock: (category, id) => {
      dispatch(startRemoveItemToStock(category, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Glass);
