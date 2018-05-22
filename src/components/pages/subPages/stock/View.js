import React, { Component } from "react";
import { Card } from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import numeral from "numeral";

import Aluminium from "./ViewTemplate/Aluminium";
import Glass from "./ViewTemplate/Glass";
import SS from "./ViewTemplate/SS";
import Others from "./ViewTemplate/Others";

const items = [
  <MenuItem key={1} value="Aluminium" primaryText="Thai Aluminium" />,
  <MenuItem key={2} value="Glass" primaryText="Glass" />,
  <MenuItem key={3} value="SS" primaryText="SS" />,
  <MenuItem key={4} value="Others" primaryText="Others" />
];

class View extends Component {
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
    // console.log("sending values from [function] in.js", values);
    //This will check if the object is empty
    if (JSON.stringify(values) === "{}") {
      return null;
    } else {
      return values;
    }
  };

  calculateStockTotal = () => {
    let aluminiumTotal = 0;
    let glassTotal = 0;
    let ssTotal = 0;
    let othersTotal = 0;

    if (this.props.stock.aluminium) {
      this.props.stock.aluminium.forEach(singleItem => {
        aluminiumTotal =
          parseFloat(aluminiumTotal) +
          parseFloat(
            parseFloat(singleItem.quantity) * parseFloat(singleItem.rate)
          );
      });
    }

    if (this.props.stock.glass) {
      this.props.stock.glass.forEach(singleItem => {
        glassTotal =
          parseFloat(glassTotal) +
          parseFloat(parseFloat(singleItem.sft) * parseFloat(singleItem.rate));
      });
    }

    if (this.props.stock.ss) {
      this.props.stock.ss.forEach(singleItem => {
        ssTotal =
          parseFloat(ssTotal) +
          parseFloat(
            parseFloat(singleItem.quantity) * parseFloat(singleItem.rate)
          );
      });
    }

    if (this.props.stock.others) {
      this.props.stock.others.forEach(singleItem => {
        othersTotal =
          parseFloat(othersTotal) +
          parseFloat(
            parseFloat(singleItem.quantity) * parseFloat(singleItem.rate)
          );
      });
    }

    console.log("====================================");
    console.log("Aluminium", aluminiumTotal);
    console.log("Glass", glassTotal);
    console.log("SS", ssTotal);
    console.log("Others", othersTotal);
    console.log("====================================");

    let Total = numeral(
      parseFloat(aluminiumTotal) +
        parseFloat(glassTotal) +
        parseFloat(ssTotal) +
        parseFloat(othersTotal)
    ).format("0,0.00");
    return [
      Total,
      numeral(parseFloat(aluminiumTotal)).format("0,0.00"),
      numeral(parseFloat(glassTotal)).format("0,0.00"),
      numeral(parseFloat(ssTotal)).format("0,0.00"),
      numeral(parseFloat(othersTotal)).format("0,0.00")
    ];
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
          style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}
        >
          <Card
            className="animated rollIn"
            style={{
              padding: 10,
              backgroundColor: "#CFD8DC"
            }}
          >
            <h1>Stock Have {this.calculateStockTotal()[0]} &#x9f3;</h1>
            <div style={{}}>
              <Card style={{ padding: 5, marginBottom: 5, color: "green" }}>
                <h4>
                  <strong>
                    Aluminium: {this.calculateStockTotal()[1]} &#x9f3;
                  </strong>
                </h4>{" "}
              </Card>
              <Card style={{ padding: 5, marginBottom: 5, color: "green" }}>
                <h4>
                  <strong>
                    Glass: {this.calculateStockTotal()[2]} &#x9f3;
                  </strong>
                </h4>{" "}
              </Card>
              <Card style={{ padding: 5, marginBottom: 5, color: "green" }}>
                <h4>
                  <strong>SS: {this.calculateStockTotal()[3]} &#x9f3;</strong>
                </h4>{" "}
              </Card>
              <Card style={{ padding: 5, marginBottom: 5, color: "green" }}>
                <h4>
                  <strong>
                    Others: {this.calculateStockTotal()[4]} &#x9f3;
                  </strong>
                </h4>{" "}
              </Card>
            </div>
          </Card>
          <Card style={{ marginTop: 10, backgroundColor: "#90A4AE" }}>
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
                style={{ color: "red", padding: 5 }}
                className="animated infinite flash"
              >
                First Add Item to Stock then Select Category !
              </div>
            )}
          </Card>
        </div>
        {/* Form to In */}
        {this.state.selectedItem &&
        this.getValuesOfTheItemCurrentlySelected() &&
        this.renderItemsBasedOnSelectedCategory() ? (
          <div
            className="container"
            style={{ marginBottom: 10, marginTop: 10 }}
          >
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
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default connect(mapStateToProps, null)(View);
