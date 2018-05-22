import React, { Component } from "react";
import { Card } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
// import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import uuid from "uuid/v4";
import { connect } from "react-redux";

// import AluminiumTable from "../Tables/AluminiumTable";
import { addSellItem } from "../../../../../actions/sells/sells-actions";

class Aluminium extends Component {
  handleToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ toggle: true });
    } else {
      this.setState({ toggle: false });
    }
  };

  handleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ length: "" });
    this.setState({ dia: "" });
    this.setState({ color: "" });
    this.setState({ rate: "" });
    this.setState({ productName: "" });
    this.setState({ companyName: "" });
  };

  friendlyHandleReset = () => {
    this.setState({ quantity: "" });
    this.setState({ rate: "" });
  };

  // handleColorChange = color => {
  //   this.setState({ color });
  //   console.log("Setting the color:", color);
  // };
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
  // renderStockItems = () => {
  //   return this.props.stock.map(singleItem => {
  //     return (
  //       <MenuItem
  //         key={singleItem.id}
  //         value={singleItem.item}
  //         primaryText={singleItem.item}
  //       />
  //     );
  //   });
  // };

  AllTotal = AllTotal => {
    this.setState({ AllTotal });
  };

  handleSubmit = () => {
    let sellsItemData = {
      id: uuid(),
      productCategoryToSell: this.state.productCategoryToSell,
      companyName: this.state.companyName,
      color: this.state.color,
      length: this.state.length,
      dia: this.state.dia,
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
      companyName: "",
      color: "",
      length: "",
      dia: "",
      productName: "",
      quantity: "",
      rate: "",
      productCategoryToSell: "aluminium"
    };
  }
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
  render() {
    return (
      <Card
        className="animated bounceInRight"
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
          <FlatButton
            style={{ marginLeft: 10, marginTop: 5 }}
            disabled={
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

export default connect(mapStateToProps, mapDispatchToProps)(Aluminium);
