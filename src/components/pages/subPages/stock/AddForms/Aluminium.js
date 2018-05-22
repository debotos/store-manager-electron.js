import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startAddItemToStock } from "../../../../../actions/stock/stock-action";

class Aluminium extends Component {
  handleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ length: "" });
    this.setState({ dia: "" });
    this.setState({ color: "" });
    this.setState({ rate: "" });
    this.setState({ productName: "" });
    this.setState({ companyName: "" });
    this.setState({ productCode: "" });
  };

  friendlyHandleReset = () => {
    this.setState({ productCode: "" });
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
  };

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
  handleProductCodeChange = event => {
    const productCode = event.target.value;
    this.setState({ productCode });
  };

  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      color: "",
      length: "",
      dia: "",
      productName: "",
      quantity: "",
      rate: "",
      productCategoryToSell: "aluminium",
      productCode: ""
    };
  }
  productCodeAlreadyExists = () => {
    let productCode = this.state.productCode;
    let flag = false;
    if (Object.keys(this.props.stock).length > 0) {
      this.props.stock.forEach(singleItem => {
        if (singleItem.productCode === productCode) {
          flag = true;
        }
      });
    }
    return flag;
  };
  handleSubmit = () => {
    let sellsItemData = {
      productCode: this.state.productCode,
      productCategoryToSell: this.state.productCategoryToSell,
      companyName: this.state.companyName,
      color: this.state.color,
      length: this.state.length,
      dia: this.state.dia,
      productName: this.state.productName,
      quantity: this.state.quantity,
      rate: this.state.rate
    };
    //Dispatch the function to add the details to the store
    if (this.productCodeAlreadyExists()) {
      this.props.showSnackBar("Product Code Already Exists !");
    } else {
      this.props.startAddItemToStock(sellsItemData);
      this.friendlyHandleReset();
      this.props.showSnackBar("Item added Successfully !");
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
            value={this.state.productCode}
            onChange={this.handleProductCodeChange}
            hint="Product Code"
            floatingLabelText="Unique Code to Identify"
          />
          <TextField
            value={this.state.productName}
            onChange={this.handleProductNameChange}
            hint="Product Name"
            floatingLabelText="Place Product Name"
          />
          <TextField
            value={this.state.companyName}
            onChange={this.handleCompanyNameChange}
            hint="Company Name"
            floatingLabelText="Place Company Name"
          />
          <TextField
            value={this.state.color}
            onChange={this.handleColorChange}
            hint="Color Name"
            floatingLabelText="Place Color Name"
          />
          <TextField
            type="number"
            value={this.state.length}
            onChange={this.handleLengthChange}
            hintText="Length"
            floatingLabelText="Place the Length "
          />
          <TextField
            type="number"
            value={this.state.dia}
            onChange={this.handleDiaChange}
            hintText="DIA"
            floatingLabelText="Place the DIA "
          />
          <TextField
            type="number"
            value={this.state.quantity}
            onChange={this.handleQuantyChange}
            hintText="Quantity"
            floatingLabelText="Place the Quantity "
          />
          <TextField
            type="number"
            value={this.state.rate}
            onChange={this.handleRateChange}
            hintText="Price/Rate"
            floatingLabelText="Place the Price/Rate "
          />
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <FlatButton
              disabled={
                this.state.productCode ||
                this.state.companyName ||
                this.state.productName ||
                this.state.color ||
                this.state.quantity ||
                this.state.length ||
                this.state.dia ||
                this.state.rate
                  ? false
                  : true
              }
              secondary={true}
              label="Reset"
              onClick={this.handleReset}
            />
            <FlatButton
              disabled={
                this.state.productCode &&
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
              label="Add"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock.aluminium
});

const mapDispatchToProps = dispatch => ({
  startAddItemToStock: itemData => dispatch(startAddItemToStock(itemData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Aluminium);
