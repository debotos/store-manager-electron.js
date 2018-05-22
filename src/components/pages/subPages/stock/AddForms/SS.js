import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startAddItemToStock } from "../../../../../actions/stock/stock-action";

class SS extends Component {
  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
    this.setState({ productCode: "" });
  };
  handleReset = () => {
    this.setState({ productName: "" });
    this.setState({ companyName: "" });
    this.setState({ length: "" });
    this.setState({ thickness: "" });
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
    this.setState({ productCode: "" });
  };
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleCompanyNameChange = event => {
    const companyName = event.target.value;
    this.setState({ companyName });
  };
  handleThicknessChange = event => {
    const thickness = event.target.value;
    this.setState({ thickness });
  };
  handleRateChange = event => {
    const rate = event.target.value;
    this.setState({ rate });
  };
  handleQuantyChange = event => {
    const quantity = event.target.value;
    this.setState({ quantity });
  };
  handleLengthChange = event => {
    const length = event.target.value;
    this.setState({ length });
  };
  handleProductCodeChange = event => {
    const productCode = event.target.value;
    this.setState({ productCode });
  };
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
      productCategoryToSell: this.state.productCategoryToSell,
      companyName: this.state.companyName,
      length: this.state.length,
      thickness: this.state.thickness,
      productName: this.state.productName,
      quantity: this.state.quantity,
      rate: this.state.rate,
      productCode: this.state.productCode
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
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      length: "",
      thickness: "",
      productName: "",
      quantity: "",
      rate: "",
      productCategoryToSell: "ss",
      productCode: ""
    };
  }
  render() {
    return (
      <Card
        className="animated bounceInUp"
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
            type="number"
            value={this.state.length}
            onChange={this.handleLengthChange}
            hintText="Length"
            floatingLabelText="Place the Length "
          />
          <TextField
            type="number"
            value={this.state.thickness}
            onChange={this.handleThicknessChange}
            hintText="Thickness"
            floatingLabelText="Place the Thickness "
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
          <FlatButton
            style={{ marginLeft: 10, marginTop: 5 }}
            disabled={
              this.state.productCode ||
              this.state.companyName ||
              this.state.productName ||
              this.state.quantity ||
              this.state.length ||
              this.state.thickness ||
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
              this.state.thickness &&
              this.state.rate
                ? false
                : true
            }
            primary={true}
            label="Add"
            onClick={this.handleSubmit}
          />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock.ss
});

const mapDispatchToProps = dispatch => ({
  startAddItemToStock: itemData => dispatch(startAddItemToStock(itemData))
});
export default connect(mapStateToProps, mapDispatchToProps)(SS);
