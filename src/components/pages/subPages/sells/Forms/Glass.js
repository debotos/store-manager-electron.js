import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import uuid from "uuid/v4";

import { addSellItem } from "../../../../../actions/sells/sells-actions";
import { connect } from "react-redux";

class Glass extends Component {
  handleReset = () => {
    this.setState({ productName: "" });
    this.setState({ sft: "" });
    this.setState({ rate: "" });
  };
  friendlyHandleReset = () => {
    this.setState({ sft: "" });
    this.setState({ rate: "" });
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
  handleSubmit = () => {
    let sellsItemData = {
      id: uuid(),
      productCategoryToSell: this.state.productCategoryToSell,
      sft: this.state.sft,
      productName: this.state.productName,
      rate: this.state.rate,
      total: (parseFloat(this.state.sft) * parseFloat(this.state.rate)).toFixed(
        2
      )
    };
    this.props.addSellItem(sellsItemData);
    this.friendlyHandleReset();
    this.props.showSnackBar("Item added Successfully !");
  };
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      sft: "",
      rate: "",
      productCategoryToSell: "glass"
    };
  }

  render() {
    return (
      <Card
        className="animated bounceInLeft"
        style={{
          marginTop: 10,
          paddingLeft: 40,
          paddingRight: 40,
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
          <FlatButton
            style={{ marginLeft: 10, marginTop: 5 }}
            disabled={
              this.state.productName || this.state.sft || this.state.rate
                ? false
                : true
            }
            secondary={true}
            label="Reset"
            onClick={this.handleReset}
          />
          <FlatButton
            disabled={
              this.state.productName && this.state.sft && this.state.rate
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

const mapDispatchToProps = dispatch => {
  return {
    addSellItem: sellItemData => {
      dispatch(addSellItem(sellItemData));
    }
  };
};

const mapStateToProps = state => {
  return {
    sellsTable: state.sells
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Glass);
