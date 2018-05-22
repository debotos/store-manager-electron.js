import React, { Component } from "react";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";

import Aluminium from "./InOutForms/Aluminium";
import Glass from "./InOutForms/Glass";
import SS from "./InOutForms/SS";
import Others from "./InOutForms/Others";

const items = [
  <MenuItem key={1} value="Aluminium" primaryText="Thai Aluminium" />,
  <MenuItem key={2} value="Glass" primaryText="Glass" />,
  <MenuItem key={3} value="SS" primaryText="SS" />,
  <MenuItem key={4} value="Others" primaryText="Others" />
];

class InOut extends Component {
  handleSelectedCategoryChange = (event, index, value) =>
    this.setState({ selectedCategory: value });
  handleSelectedItemChange = (event, index, value) =>
    this.setState({ selectedItem: value });
  renderItemsBasedOnSelectedCategory = () => {
    let items = [];
    let selectedCategory = this.state.selectedCategory;
    if (selectedCategory) {
      let stock = this.props.stock;
      for (let stockCategory in stock) {
        if (
          stockCategory.toString() === selectedCategory.toString().toLowerCase()
        ) {
          items = stock[stockCategory].map((singleItem, index) => {
            return (
              <MenuItem
                key={index}
                value={singleItem.productCode}
                primaryText={singleItem.productCode}
              />
            );
          });
        }
      }
    }
    if (items.length > 0) {
      return items;
    } else {
      return null;
    }
  };
  getValuesOfTheItemCurrentlySelected = () => {
    const selectedCategory = this.state.selectedCategory;
    const selectedItem = this.state.selectedItem;
    const stock = this.props.stock;
    let values = {};
    for (let stockCategory in stock) {
      if (
        stockCategory.toString() === selectedCategory.toString().toLowerCase()
      ) {
        stock[stockCategory].forEach(singleItem => {
          if (singleItem.productCode.toString() === selectedItem.toString()) {
            if (singleItem.productCategoryToSell.toString() === "aluminium") {
              values = {
                id: singleItem.id,
                productCode: singleItem.productCode,
                productCategoryToSell: singleItem.productCategoryToSell,
                companyName: singleItem.companyName,
                color: singleItem.color,
                length: singleItem.length,
                dia: singleItem.dia,
                productName: singleItem.productName,
                quantity: singleItem.quantity,
                rate: singleItem.rate
              };
            }
            if (singleItem.productCategoryToSell.toString() === "glass") {
              values = {
                id: singleItem.id,
                productCategoryToSell: singleItem.productCategoryToSell,
                sft: singleItem.sft,
                productName: singleItem.productName,
                rate: singleItem.rate,
                productCode: singleItem.productCode
              };
            }
            if (singleItem.productCategoryToSell.toString() === "ss") {
              values = {
                id: singleItem.id,
                productCategoryToSell: singleItem.productCategoryToSell,
                companyName: singleItem.companyName,
                length: singleItem.length,
                thickness: singleItem.thickness,
                productName: singleItem.productName,
                quantity: singleItem.quantity,
                rate: singleItem.rate,
                productCode: singleItem.productCode
              };
            }
            if (singleItem.productCategoryToSell.toString() === "others") {
              values = {
                id: singleItem.id,
                productCategoryToSell: singleItem.productCategoryToSell,
                productName: singleItem.productName,
                quantity: singleItem.quantity,
                rate: singleItem.rate,
                productCode: singleItem.productCode
              };
            }
          }
        });
      }
    }

    //This will check if the object is empty
    if (JSON.stringify(values) === "{}") {
      return null;
    } else {
      return values;
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      selectedItem: null
    };
  }
  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: 5, marginBottom: 5 }}
        >
          <Card style={{ backgroundColor: "#90A4AE" }}>
            {/* Select Category */}
            <SelectField
              style={{ marginTop: 5 }}
              hintText="Select Category"
              value={this.state.selectedCategory}
              onChange={this.handleSelectedCategoryChange}
            >
              {items}
            </SelectField>
            {/* Select Item */}
            {this.renderItemsBasedOnSelectedCategory() ? (
              <SelectField
                style={{ marginTop: 5 }}
                hintText="Select Item Code"
                value={this.state.selectedItem}
                onChange={this.handleSelectedItemChange}
              >
                {this.renderItemsBasedOnSelectedCategory()}
              </SelectField>
            ) : (
              <div
                className="animated infinite tada"
                style={{ color: "red", padding: 10 }}
              >
                First Add Item to Stock then Select Category !
              </div>
            )}
          </Card>
          {/* Form to In */}
          {this.state.selectedItem &&
          this.getValuesOfTheItemCurrentlySelected() &&
          this.renderItemsBasedOnSelectedCategory() ? (
            <div style={{ marginBottom: 10 }}>
              {this.state.selectedCategory === "Aluminium" && (
                <Aluminium
                  showSnackBar={this.props.showSnackBar}
                  productCode={this.state.selectedItem}
                  values={this.getValuesOfTheItemCurrentlySelected()}
                />
              )}
              {this.state.selectedCategory === "Glass" && (
                <Glass
                  showSnackBar={this.props.showSnackBar}
                  productCode={this.state.selectedItem}
                  values={this.getValuesOfTheItemCurrentlySelected()}
                />
              )}
              {this.state.selectedCategory === "SS" && (
                <SS
                  showSnackBar={this.props.showSnackBar}
                  productCode={this.state.selectedItem}
                  values={this.getValuesOfTheItemCurrentlySelected()}
                />
              )}
              {this.state.selectedCategory === "Others" && (
                <Others
                  showSnackBar={this.props.showSnackBar}
                  productCode={this.state.selectedItem}
                  values={this.getValuesOfTheItemCurrentlySelected()}
                />
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default connect(mapStateToProps, null)(InOut);
