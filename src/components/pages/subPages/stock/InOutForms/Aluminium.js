import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startUpdateStockItem } from "../../../../../actions/stock/stock-action";

class Aluminium extends Component {
  handleQuantyChange = event => {
    const quantity = event.target.value;
    if (!quantity || quantity.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ quantity });
    }
  };
  handleLengthChange = event => {
    const length = event.target.value;
    if (!length || length.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ length });
    }
  };

  handleDiaChange = event => {
    const dia = event.target.value;
    if (!dia || dia.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ dia });
    }
  };
  handleRateChange = event => {
    const rate = event.target.value;
    if (!rate || rate.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ rate });
    }
  };
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleCompanyNameChange = event => {
    const companyName = event.target.value;
    this.setState({ companyName });
  };
  handleColorChange = event => {
    const color = event.target.value;
    this.setState({ color });
  };
  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.productCode) {
      this.setState({ productCode: this.props.values.productCode });
      this.setState({ companyName: this.props.values.companyName });
      this.setState({ color: this.props.values.color });
      this.setState({ productName: this.props.values.productName });
      this.setState({ rate: this.props.values.rate });
      this.setState({ length: this.props.values.length });
      this.setState({ dia: this.props.values.dia });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      productCode: this.props.values.productCode,
      companyName: this.props.values.companyName,
      color: this.props.values.color,
      length: this.props.values.length,
      dia: this.props.values.dia,
      productName: this.props.values.productName,
      quantity: "",
      rate: this.props.values.rate
    };
  }
  handleStockIn = () => {
    let Data = {
      productCode: this.props.values.productCode,
      productCategoryToSell: this.props.values.productCategoryToSell,
      companyName: this.state.companyName,
      color: this.state.color,
      length: this.state.length,
      dia: this.state.dia,
      productName: this.state.productName,
      quantity: (
        parseFloat(this.state.quantity) + parseFloat(this.props.values.quantity)
      ).toFixed(2),
      rate: this.state.rate
    };
    //Dispatch the function to add the details to the store
    this.props.startUpdateStockItem(this.props.values.id, Data);
    this.friendlyHandleReset();
    this.props.showSnackBar("In Action Successfully !");
  };
  handleStockOut = () => {
    let Data = {
      productCode: this.props.values.productCode,
      productCategoryToSell: this.props.values.productCategoryToSell,
      companyName: this.state.companyName,
      color: this.state.color,
      length: this.state.length,
      dia: this.state.dia,
      productName: this.state.productName,
      quantity: (
        parseFloat(this.props.values.quantity) - parseFloat(this.state.quantity)
      ).toFixed(2),
      rate: this.state.rate
    };
    //Dispatch the function to add the details to the store

    let quantity = this.state.quantity;
    if (parseFloat(quantity) <= parseFloat(this.props.values.quantity)) {
      this.props.startUpdateStockItem(this.props.values.id, Data);
      this.friendlyHandleReset();
      this.props.showSnackBar("Out Action Successfully !");
    } else {
      this.props.showSnackBar("Error! You can't out more than you have!");
    }
  };
  render() {
    return (
      <Card
        className="animated bounceInRight"
        style={{
          marginTop: 10,
          padding: 13,
          paddingBottom: 20,
          backgroundColor: "#CFD8DC"
        }}
      >
        {/* All Fields */}
        <div>
          <TextField
            value={this.state.productName}
            onChange={this.handleProductNameChange}
            hint="Product Name"
            floatingLabelText="Update Product Name"
          />
          <TextField
            value={this.state.companyName}
            onChange={this.handleCompanyNameChange}
            hint="Company Name"
            floatingLabelText="Update Company Name"
          />
          <TextField
            value={this.state.color}
            onChange={this.handleColorChange}
            hint="Color Name"
            floatingLabelText="Update Color Name"
          />
          <TextField
            type="number"
            value={this.state.length}
            onChange={this.handleLengthChange}
            hintText="Length"
            floatingLabelText="Update Length"
          />
          <TextField
            type="number"
            value={this.state.dia}
            onChange={this.handleDiaChange}
            hintText="DIA"
            floatingLabelText="Update Dia"
          />
          <TextField
            type="number"
            value={this.state.quantity}
            onChange={this.handleQuantyChange}
            hintText="Quantity"
            floatingLabelText={`Add Quantity (Now: ${
              this.props.values.quantity
            })`}
          />
          <TextField
            type="number"
            value={this.state.rate}
            onChange={this.handleRateChange}
            hintText="Price/Rate"
            floatingLabelText="Update the Price/Rate "
          />
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <FlatButton
              disabled={
                this.state.companyName &&
                this.state.productName &&
                this.state.quantity &&
                this.state.length &&
                this.state.dia &&
                this.state.rate
                  ? false
                  : true
              }
              secondary={true}
              label="Out"
              onClick={this.handleStockOut}
            />
            <FlatButton
              disabled={
                this.state.companyName &&
                this.state.productName &&
                this.state.quantity &&
                this.state.length &&
                this.state.dia &&
                this.state.rate
                  ? false
                  : true
              }
              primary={true}
              label="In"
              onClick={this.handleStockIn}
            />
          </div>
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUpdateStockItem: (id, data) => dispatch(startUpdateStockItem(id, data))
});

export default connect(null, mapDispatchToProps)(Aluminium);
