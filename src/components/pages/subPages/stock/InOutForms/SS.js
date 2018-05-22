import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startUpdateStockItem } from "../../../../../actions/stock/stock-action";

class SS extends Component {
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
  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.productCode) {
      this.setState({ productCode: this.props.values.productCode });
      this.setState({ companyName: this.props.values.companyName });
      this.setState({ thickness: this.props.values.thickness });
      this.setState({ productName: this.props.values.productName });
      this.setState({ rate: this.props.values.rate });
      this.setState({ length: this.props.values.length });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      productCode: this.props.values.productCode,
      companyName: this.props.values.companyName,
      length: this.props.values.length,
      thickness: this.props.values.thickness,
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
      length: this.state.length,
      thickness: this.state.thickness,
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
      length: this.state.length,
      thickness: this.state.thickness,
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
            type="number"
            value={this.state.length}
            onChange={this.handleLengthChange}
            hintText="Length"
            floatingLabelText="Update Length"
          />
          <TextField
            type="number"
            value={this.state.thickness}
            onChange={this.handleThicknessChange}
            hintText="Thickness"
            floatingLabelText="Update the Thickness "
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

          <FlatButton
            disabled={
              this.state.companyName &&
              this.state.productName &&
              this.state.quantity &&
              this.state.length &&
              this.state.thickness &&
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
              this.state.thickness &&
              this.state.rate
                ? false
                : true
            }
            primary={true}
            label="In"
            onClick={this.handleStockIn}
          />
        </div>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUpdateStockItem: (id, data) => dispatch(startUpdateStockItem(id, data))
});

export default connect(null, mapDispatchToProps)(SS);
