import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import uuid from "uuid/v4";

import { addSellItem } from "../../../../../actions/sells/sells-actions";
import { connect } from "react-redux";

class Others extends Component {
  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
  };
  handleReset = () => {
    this.setState({ productName: "" });
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
  };
  handleProductNameChange = event => {
    const productName = event.target.value;
    this.setState({ productName });
  };
  handleQuantityChange = event => {
    const quantity = event.target.value;
    this.setState({ quantity });
  };
  handleRateChange = event => {
    const rate = event.target.value;
    this.setState({ rate });
  };
  handleSubmit = () => {
    let sellsItemData = {
      id: uuid(),
      productCategoryToSell: this.state.productCategoryToSell,
      productName: this.state.productName,
      quantity: this.state.quantity,
      rate: this.state.rate,
      total: (
        parseFloat(this.state.quantity) * parseFloat(this.state.rate)
      ).toFixed(2)
    };
    this.props.addSellItem(sellsItemData);
    this.friendlyHandleReset();
    this.props.showSnackBar("Item added Successfully !");
  };
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      quantity: "",
      rate: "",
      productCategoryToSell: "others"
    };
  }

  render() {
    return (
      <Card
        className="animated bounceInDown"
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
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
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
              this.state.productName || this.state.quantity || this.state.rate
                ? false
                : true
            }
            secondary={true}
            label="Reset"
            onClick={this.handleReset}
          />
          <FlatButton
            disabled={
              this.state.productName && this.state.quantity && this.state.rate
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

export default connect(mapStateToProps, mapDispatchToProps)(Others);
