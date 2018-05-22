import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startAddItemToStock } from "../../../../../actions/stock/stock-action";

class Glass extends Component {
  handleReset = () => {
    this.setState({ productName: "" });
    this.setState({ sft: "" });
    this.setState({ rate: "" });
    this.setState({ productCode: "" });
  };
  friendlyHandleReset = () => {
    this.setState({ sft: "" });
    this.setState({ rate: "" });
    this.setState({ productCode: "" });
  };
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleSFTChange = event => {
    const sft = event.target.value;
    this.setState({ sft });
  };
  handleRateChange = event => {
    const rate = event.target.value;
    this.setState({ rate });
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
      sft: this.state.sft,
      productName: this.state.productName,
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
      productName: "",
      sft: "",
      rate: "",
      productCategoryToSell: "glass",
      productCode: ""
    };
  }

  render() {
    return (
      <Card
        className="animated bounceInLeft"
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
            type="number"
            value={this.state.sft}
            onChange={this.handleSFTChange}
            hintText="SFT"
            floatingLabelText="Place the SFT "
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
                this.state.productName ||
                this.state.sft ||
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
                this.state.productName &&
                this.state.sft &&
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
  stock: state.stock.glass
});

const mapDispatchToProps = dispatch => ({
  startAddItemToStock: itemData => dispatch(startAddItemToStock(itemData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Glass);
