import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { startUpdateStockItem } from "../../../../../actions/stock/stock-action";

class Glass extends Component {
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
  friendlyHandleReset = () => {
    this.setState({ sft: "" });
  };
  componentDidUpdate = () => {
    if (this.props.values.productCode !== this.state.productCode) {
      this.setState({ productCode: this.props.values.productCode });
      this.setState({ productName: this.props.values.productName });
      this.setState({ rate: this.props.values.rate });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      productCode: this.props.values.productCode,
      productName: this.props.values.productName,
      sft: "",
      rate: this.props.values.rate
    };
  }
  handleStockIn = () => {
    let Data = {
      productCategoryToSell: this.props.values.productCategoryToSell,
      sft: (
        parseFloat(this.state.sft) + parseFloat(this.props.values.sft)
      ).toFixed(2),
      productName: this.state.productName,
      rate: this.state.rate,
      productCode: this.props.values.productCode
    };
    //Dispatch the function to add the details to the store
    this.props.startUpdateStockItem(this.props.values.id, Data);
    this.friendlyHandleReset();
    this.props.showSnackBar("In Action Successfully !");
  };
  handleStockOut = () => {
    let Data = {
      productCategoryToSell: this.props.values.productCategoryToSell,
      sft: (
        parseFloat(this.props.values.sft) - parseFloat(this.state.sft)
      ).toFixed(2),
      productName: this.state.productName,
      rate: this.state.rate,
      productCode: this.props.values.productCode
    };
    //Dispatch the function to add the details to the store
    let sft = this.state.sft;
    if (parseFloat(sft) <= parseFloat(this.props.values.sft)) {
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
            value={this.state.productName}
            onChange={this.handleProductNameChange}
            hint="Product Name"
            floatingLabelText="update Product Name"
          />
          <TextField
            type="number"
            value={this.state.sft}
            onChange={this.handleSFTChange}
            hintText="Add SFT"
            floatingLabelText={`Add SFT (Now: ${this.props.values.sft})`}
          />

          <TextField
            type="number"
            value={this.state.rate}
            onChange={this.handleRateChange}
            hintText="Price/Rate"
            floatingLabelText="update the Price/Rate "
          />
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <FlatButton
              disabled={
                this.state.productName && this.state.sft && this.state.rate
                  ? false
                  : true
              }
              secondary={true}
              label="Out"
              onClick={this.handleStockOut}
            />
            <FlatButton
              disabled={
                this.state.productName && this.state.sft && this.state.rate
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

export default connect(null, mapDispatchToProps)(Glass);
