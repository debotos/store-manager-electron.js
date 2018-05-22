import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import numeral from "numeral";

import "../../../../../style/sells/table.css";
import { removeSellItem } from "../../../../../actions/sells/sells-actions";
import { addTable } from "../../../../../actions/sells/table-actions";
import { makeEmptySellItem } from "../../../../../actions/sells/sells-actions";

class TableGenerator extends Component {
  handleAluminiumDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ aluminiumDiscountToggle: true });
    } else {
      this.setState({ aluminiumDiscountToggle: false });
      this.setState({ aluminiumDiscount: 0 });
    }
  };
  handleGlassDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ glassDiscountToggle: true });
    } else {
      this.setState({ glassDiscountToggle: false });
      this.setState({ glassDiscount: 0 });
    }
  };
  handleSSDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ ssDiscountToggle: true });
    } else {
      this.setState({ ssDiscountToggle: false });
      this.setState({ ssDiscount: 0 });
    }
  };
  handleOthersDiscountToggle = (event, isInputChecked) => {
    if (isInputChecked) {
      this.setState({ othersDiscountToggle: true });
    } else {
      this.setState({ othersDiscountToggle: false });
      this.setState({ othersDiscount: 0 });
    }
  };
  handleAluminiumRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.aluminium[row] });
    this.handleDetailsModelOpen();
  };
  handleGlassRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.glass[row] });
    this.handleDetailsModelOpen();
  };
  handleSSRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.ss[row] });
    this.handleDetailsModelOpen();
  };
  handleOthersRowClick = (row, column, event) => {
    this.setState({ ModalData: this.props.allSells.others[row] });
    this.handleDetailsModelOpen();
  };
  handleDetailsModelOpen = () => {
    this.setState({ detailsModelOpen: true });
  };
  handleDetailsModelClose = () => {
    this.setState({ detailsModelOpen: false });
  };
  showDetailsToModel = productCategoryToSell => {
    if (productCategoryToSell === "aluminium") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Company: <strong>{this.state.ModalData.companyName}</strong> <br />{" "}
          Length: <strong>{this.state.ModalData.length}</strong> <br /> Dia:{" "}
          <strong>{this.state.ModalData.dia}</strong> <br /> Color:{" "}
          <strong>{this.state.ModalData.color}</strong> <br /> Quantity:{" "}
          <strong>{this.state.ModalData.quantity}</strong> <br /> Rate:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.rate)).format("0,0.00")}
          </strong>{" "}
          <br />
          Total:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.total)).format("0,0.00")}
          </strong>{" "}
          <br />
        </div>
      );
    }
    if (productCategoryToSell === "glass") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br /> SFT:{" "}
          <strong>{this.state.ModalData.sft}</strong> <br />
          Rate:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.rate)).format("0,0.00")}
          </strong>{" "}
          <br />
          Total:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.total)).format("0,0.00")}
          </strong>{" "}
          <br />
        </div>
      );
    }
    if (productCategoryToSell === "ss") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Company: <strong>{this.state.ModalData.companyName}</strong> <br />{" "}
          Length: <strong>{this.state.ModalData.length}</strong> <br />{" "}
          Thickness: <strong>{this.state.ModalData.thickness}</strong> <br />Quantity:{" "}
          <strong>{this.state.ModalData.quantity}</strong> <br /> Rate:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.rate)).format("0,0.00")}
          </strong>{" "}
          <br />
          Total:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.total)).format("0,0.00")}
          </strong>{" "}
          <br />
        </div>
      );
    }
    if (productCategoryToSell === "others") {
      return (
        <div>
          Item: <strong>{this.state.ModalData.productName}</strong> <br />{" "}
          Quantity: <strong>{this.state.ModalData.quantity}</strong> <br />
          Rate:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.rate)).format("0,0.00")}
          </strong>{" "}
          <br />
          Total:{" "}
          <strong>
            {numeral(parseFloat(this.state.ModalData.total)).format("0,0.00")}
          </strong>{" "}
          <br />
        </div>
      );
    }
  };
  renderAluminiumTableRow = () => {
    let id = 0;
    return this.props.allSells.aluminium.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "aluminium") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.companyName}</TableRowColumn>
            <TableRowColumn>{singleItem.length}</TableRowColumn>
            <TableRowColumn>{singleItem.dia}</TableRowColumn>
            <TableRowColumn>{singleItem.color}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.rate)).format("0,0.00")}
            </TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.total)).format("0,0.00")}
            </TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderGlassTableRow = () => {
    let id = 0;
    return this.props.allSells.glass.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "glass") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.sft}</TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.rate)).format("0,0.00")}
            </TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.total)).format("0,0.00")}
            </TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderSSTableRow = () => {
    let id = 0;
    return this.props.allSells.ss.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "ss") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.companyName}</TableRowColumn>
            <TableRowColumn>{singleItem.length}</TableRowColumn>
            <TableRowColumn>{singleItem.thickness}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.rate)).format("0,0.00")}
            </TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.total)).format("0,0.00")}
            </TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  renderOthersTableRow = () => {
    let id = 0;
    return this.props.allSells.others.map((singleItem, index) => {
      if (singleItem.productCategoryToSell === "others") {
        id += 1;
        return (
          <TableRow key={index}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{singleItem.productName}</TableRowColumn>
            <TableRowColumn>{singleItem.quantity}</TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.rate)).format("0,0.00")}
            </TableRowColumn>
            <TableRowColumn>
              {numeral(parseFloat(singleItem.total)).format("0,0.00")}
            </TableRowColumn>
          </TableRow>
        );
      }
    });
  };
  haveAluminiumType = () => {
    let flag = false;
    this.props.allSells.aluminium.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "aluminium") {
        flag = true;
      }
    });
    return flag;
  };
  haveGlassType = () => {
    let flag = false;
    this.props.allSells.glass.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "glass") {
        flag = true;
      }
    });
    return flag;
  };
  haveSSType = () => {
    let flag = false;
    this.props.allSells.ss.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "ss") {
        flag = true;
      }
    });
    return flag;
  };
  haveOthersType = () => {
    let flag = false;
    this.props.allSells.others.forEach(singleSell => {
      if (singleSell.productCategoryToSell === "others") {
        flag = true;
      }
    });
    return flag;
  };
  handleDetailsModelDeleteAction = () => {
    const id = this.state.ModalData.id;
    const productCategoryToSell = this.state.ModalData.productCategoryToSell;
    this.props.removeSellItem(id, productCategoryToSell);
    this.handleDetailsModelClose();
  };
  handleAluminiumDiscountChange = event => {
    const aluminiumDiscount = event.target.value;
    if (!aluminiumDiscount || aluminiumDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (aluminiumDiscount > 100 || aluminiumDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ aluminiumDiscount });
      }
    }
  };
  handleGlassDiscountChange = event => {
    const glassDiscount = event.target.value;
    if (!glassDiscount || glassDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (glassDiscount > 100 || glassDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ glassDiscount });
      }
    }
  };
  handleSSDiscountChange = event => {
    const ssDiscount = event.target.value;
    if (!ssDiscount || ssDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (ssDiscount > 100 || ssDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ ssDiscount });
      }
    }
  };
  handleOthersDiscountChange = event => {
    const othersDiscount = event.target.value;
    if (!othersDiscount || othersDiscount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      if (othersDiscount > 100 || othersDiscount < 0) {
        this.props.showSnackBar("Wrong Input ! [max:100 & min:0]");
      } else {
        this.setState({ othersDiscount });
      }
    }
  };

  handleoveridefinallyAllTotal = event => {
    const finallyAllTotalField = event.target.value;
    let total = this.calculatorOfAllTotal();
    if (finallyAllTotalField) {
      if (parseFloat(finallyAllTotalField) <= parseFloat(total)) {
        this.setState({ finallyAllTotalField });
      } else {
        this.props.showSnackBar(
          `Failed! Input MAX: ${parseFloat(total).toFixed(2)}`
        );
      }
    } else {
      this.setState({ finallyAllTotalField });
    }
  };

  handleoverideTotalSumOfAluminium = event => {
    const overideTotalSumOfAluminium = event.target.value;
    if (overideTotalSumOfAluminium) {
      if (
        parseFloat(overideTotalSumOfAluminium) <=
        parseFloat(this.calculateAluminiumSUM()[1])
      ) {
        this.setState({ overideTotalSumOfAluminium });
        // this.calculateAluminiumSUM(overideTotalSumOfAluminium);
      } else {
        this.props.showSnackBar(
          `Failed! Input MAX: ${parseFloat(
            this.calculateAluminiumSUM()[1]
          ).toFixed(2)}`
        );
      }
    } else {
      this.setState({ overideTotalSumOfAluminium });
    }
  };
  handleoverideTotalSumOfGlass = event => {
    const overideTotalSumOfGlass = event.target.value;
    if (overideTotalSumOfGlass) {
      if (
        parseFloat(overideTotalSumOfGlass) <=
        parseFloat(this.calculateGlassSUM()[1])
      ) {
        this.setState({ overideTotalSumOfGlass });
        // this.calculateGlassSUM(overideTotalSumOfGlass);
      } else {
        this.props.showSnackBar(
          `Failed! Input MAX: ${parseFloat(this.calculateGlassSUM()[1]).toFixed(
            2
          )}`
        );
      }
    } else {
      this.setState({ overideTotalSumOfGlass });
    }
  };
  handleoverideTotalSumOfSS = event => {
    const overideTotalSumOfSS = event.target.value;
    if (overideTotalSumOfSS) {
      if (
        parseFloat(overideTotalSumOfSS) <= parseFloat(this.calculateSSSUM()[1])
      ) {
        this.setState({ overideTotalSumOfSS });
        // this.calculateSSSUM(overideTotalSumOfSS);
      } else {
        this.props.showSnackBar(
          `Failed! Input MAX: ${parseFloat(this.calculateSSSUM()[1]).toFixed(
            2
          )}`
        );
      }
    } else {
      this.setState({ overideTotalSumOfSS });
    }
  };
  handleoverideTotalSumOfOthers = event => {
    const overideTotalSumOfOthers = event.target.value;
    if (overideTotalSumOfOthers) {
      if (
        parseFloat(overideTotalSumOfOthers) <=
        parseFloat(this.calculateOthersSUM()[1])
      ) {
        this.setState({ overideTotalSumOfOthers });
        // this.calculateOthersSUM(overideTotalSumOfOthers);
      } else {
        this.props.showSnackBar(
          `Failed! Input MAX: ${parseFloat(
            this.calculateOthersSUM()[1]
          ).toFixed(2)}`
        );
      }
    } else {
      this.setState({ overideTotalSumOfOthers });
    }
  };
  calculateAluminiumSUM = () => {
    let friendlyDiscount = this.state.overideTotalSumOfAluminium
      ? this.state.overideTotalSumOfAluminium
      : 0;

    let SUM = 0;
    this.props.allSells.aluminium.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.aluminiumDiscount
        ? parseFloat(this.state.aluminiumDiscount)
        : 0) /
      100;

    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    let atLastFinal = (
      parseFloat(finalResult) - parseFloat(friendlyDiscount)
    ).toFixed(2);
    return [finalDiscountAmount, finalResult, SUM, atLastFinal];
  };
  calculateGlassSUM = () => {
    let friendlyDiscount = this.state.overideTotalSumOfGlass
      ? this.state.overideTotalSumOfGlass
      : 0;
    let SUM = 0;
    this.props.allSells.glass.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.glassDiscount ? parseFloat(this.state.glassDiscount) : 0) /
      100;

    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    let atLastFinal = (
      parseFloat(finalResult) - parseFloat(friendlyDiscount)
    ).toFixed(2);
    return [finalDiscountAmount, finalResult, SUM, atLastFinal];
  };
  calculateSSSUM = () => {
    let friendlyDiscount = this.state.overideTotalSumOfSS
      ? this.state.overideTotalSumOfSS
      : 0;
    let SUM = 0;
    this.props.allSells.ss.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.ssDiscount ? parseFloat(this.state.ssDiscount) : 0) /
      100;

    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    let atLastFinal = (
      parseFloat(finalResult) - parseFloat(friendlyDiscount)
    ).toFixed(2);
    return [finalDiscountAmount, finalResult, SUM, atLastFinal];
  };
  calculateOthersSUM = () => {
    let friendlyDiscount = this.state.overideTotalSumOfOthers
      ? this.state.overideTotalSumOfOthers
      : 0;
    let SUM = 0;
    this.props.allSells.others.forEach(singleItem => {
      SUM = parseFloat(SUM) + parseFloat(singleItem.total);
    });
    let finalDiscountAmount =
      SUM.toFixed(2) *
      (this.state.othersDiscount ? parseFloat(this.state.othersDiscount) : 0) /
      100;
    finalDiscountAmount = finalDiscountAmount.toFixed(2);
    let finalResult = (SUM.toFixed(2) - finalDiscountAmount).toFixed(2);
    let atLastFinal = (
      parseFloat(finalResult) - parseFloat(friendlyDiscount)
    ).toFixed(2);
    return [finalDiscountAmount, finalResult, SUM, atLastFinal];
  };
  calculatorOfAllTotal = () => {
    let aluminiumSum = 0;
    let glassSum = 0;
    let ssSum = 0;
    let othersSum = 0;

    this.props.sellsTable.aluminium.forEach(singleItem => {
      aluminiumSum =
        parseFloat(aluminiumSum) +
        parseFloat(singleItem.attribute.afterFriendlyDiscountTotal);
    });

    this.props.sellsTable.glass.forEach(singleItem => {
      glassSum =
        parseFloat(glassSum) +
        parseFloat(singleItem.attribute.afterFriendlyDiscountTotal);
    });

    this.props.sellsTable.ss.forEach(singleItem => {
      ssSum =
        parseFloat(ssSum) +
        parseFloat(singleItem.attribute.afterFriendlyDiscountTotal);
    });

    this.props.sellsTable.others.forEach(singleItem => {
      othersSum =
        parseFloat(othersSum) +
        parseFloat(singleItem.attribute.afterFriendlyDiscountTotal);
    });

    let total = (aluminiumSum + glassSum + ssSum + othersSum).toFixed(2);
    return total;
  };
  finallyAllTotal = () => {
    let total = this.calculatorOfAllTotal();
    if (this.state.finallyAllTotalField) {
      this.props.setAllTotal({
        total: parseFloat(total).toFixed(2),
        finalFriendlyDiscount: parseFloat(
          this.state.finallyAllTotalField
        ).toFixed(2),
        finalTotal: (
          parseFloat(total) -
          parseFloat(this.state.finallyAllTotalField).toFixed(2)
        ).toFixed(2)
      });
      return (
        parseFloat(total) -
        parseFloat(this.state.finallyAllTotalField).toFixed(2)
      ).toFixed(2);
    } else {
      this.props.setAllTotal({
        total: parseFloat(total).toFixed(2),
        finalFriendlyDiscount: 0,
        finalTotal: (parseFloat(total) - 0).toFixed(2)
      });
      return total;
    }
  };

  aluminiumStateReset = () => {
    this.setState({ aluminiumDiscount: null });
    this.setState({ overideTotalSumOfAluminium: "" });
  };
  glassStateReset = () => {
    this.setState({ glassDiscount: null });
    this.setState({ overideTotalSumOfGlass: "" });
  };
  ssStateReset = () => {
    this.setState({ ssDiscount: null });
    this.setState({ overideTotalSumOfSS: "" });
  };
  othersStateReset = () => {
    this.setState({ othersDiscount: null });
    this.setState({ overideTotalSumOfOthers: "" });
  };
  componentDidUpdate = () => {
    if (
      this.props.sellsTable.aluminium.length === 0 &&
      this.props.sellsTable.glass.length === 0 &&
      this.props.sellsTable.ss.length === 0 &&
      this.props.sellsTable.others.length === 0 &&
      this.state.finallyAllTotalField
    ) {
      this.setState({ finallyAllTotalField: "" });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      aluminiumDiscount: "",
      glassDiscount: "",
      ssDiscount: "",
      othersDiscount: "",
      detailsModelOpen: false,
      ModalData: "",
      aluminiumDiscountToggle: false,
      glassDiscountToggle: false,
      ssDiscountToggle: false,
      othersDiscountToggle: false,
      overideTotalSumOfAluminium: "",
      overideTotalSumOfGlass: "",
      overideTotalSumOfSS: "",
      overideTotalSumOfOthers: "",
      finallyAllTotalField: ""
    };
  }

  handleAluminiumTableSubmit = () => {
    let discount = this.state.aluminiumDiscount;
    if (!discount) {
      discount = 0;
    }
    let TableData = this.props.allSells.aluminium;
    let dataToSend = {
      category: "aluminium",
      data: {
        table: TableData,
        attribute: {
          atLastTotalAll: parseFloat(this.calculateAluminiumSUM()[3]).toFixed(
            2
          ),
          allCellTotal: parseFloat(this.calculateAluminiumSUM()[2]).toFixed(2),
          discount: parseInt(discount, 10),
          discountAmount: this.calculateAluminiumSUM()[0],
          afterDiscountTotal: this.calculateAluminiumSUM()[1],
          friendlyDiscount: this.state.overideTotalSumOfAluminium
            ? parseFloat(this.state.overideTotalSumOfAluminium).toFixed(2)
            : 0,
          afterFriendlyDiscountTotal: this.state.overideTotalSumOfAluminium
            ? (
                parseFloat(this.calculateAluminiumSUM()[1]) -
                parseFloat(this.state.overideTotalSumOfAluminium)
              ).toFixed(2)
            : parseFloat(this.calculateAluminiumSUM()[1]).toFixed(2)
        }
      }
    };
    this.props.addTable(dataToSend);
    this.props.makeEmptySellItem("aluminium");
    this.aluminiumStateReset();
  };
  handleGlassTableSubmit = () => {
    let discount = this.state.glassDiscount;
    if (!discount) {
      discount = 0;
    }
    let TableData = this.props.allSells.glass;

    let dataToSend = {
      category: "glass",
      data: {
        table: TableData,
        attribute: {
          allCellTotal: parseFloat(this.calculateGlassSUM()[2]).toFixed(2),
          discount: parseInt(discount, 10),
          discountAmount: this.calculateGlassSUM()[0],
          afterDiscountTotal: this.calculateGlassSUM()[1],
          friendlyDiscount: this.state.overideTotalSumOfGlass
            ? parseFloat(this.state.overideTotalSumOfGlass).toFixed(2)
            : 0,
          afterFriendlyDiscountTotal: this.state.overideTotalSumOfGlass
            ? (
                parseFloat(this.calculateGlassSUM()[1]) -
                parseFloat(this.state.overideTotalSumOfGlass)
              ).toFixed(2)
            : parseFloat(this.calculateGlassSUM()[1]).toFixed(2),
          atLastTotalAll: parseFloat(this.calculateGlassSUM()[3]).toFixed(2)
        }
      }
    };
    this.props.addTable(dataToSend);
    this.props.makeEmptySellItem("glass");
    this.glassStateReset();
  };
  handleSSTableSubmit = () => {
    let discount = this.state.ssDiscount;
    if (!discount) {
      discount = 0;
    }
    let TableData = this.props.allSells.ss;
    let dataToSend = {
      category: "ss",
      data: {
        table: TableData,
        attribute: {
          atLastTotalAll: parseFloat(this.calculateSSSUM()[3]).toFixed(2),
          allCellTotal: parseFloat(this.calculateSSSUM()[2]).toFixed(2),
          discount: parseInt(discount, 10),
          discountAmount: this.calculateSSSUM()[0],
          afterDiscountTotal: this.calculateSSSUM()[1],
          friendlyDiscount: this.state.overideTotalSumOfSS
            ? parseFloat(this.state.overideTotalSumOfSS).toFixed(2)
            : 0,
          afterFriendlyDiscountTotal: this.state.overideTotalSumOfSS
            ? (
                parseFloat(this.calculateSSSUM()[1]) -
                parseFloat(this.state.overideTotalSumOfSS)
              ).toFixed(2)
            : parseFloat(this.calculateSSSUM()[1]).toFixed(2)
        }
      }
    };
    this.props.addTable(dataToSend);
    this.props.makeEmptySellItem("ss");
    this.ssStateReset();
  };
  handleOthersTableSubmit = () => {
    let discount = this.state.othersDiscount;
    if (!discount) {
      discount = 0;
    }
    let TableData = this.props.allSells.others;
    let dataToSend = {
      category: "others",
      data: {
        table: TableData,
        attribute: {
          atLastTotalAll: parseFloat(this.calculateOthersSUM()[3]).toFixed(2),
          allCellTotal: parseFloat(this.calculateOthersSUM()[2]).toFixed(2),
          discount: parseInt(discount, 10),
          discountAmount: this.calculateOthersSUM()[0],
          afterDiscountTotal: this.calculateOthersSUM()[1],
          friendlyDiscount: this.state.overideTotalSumOfOthers
            ? parseFloat(this.state.overideTotalSumOfOthers).toFixed(2)
            : 0,
          afterFriendlyDiscountTotal: this.state.overideTotalSumOfOthers
            ? (
                parseFloat(this.calculateOthersSUM()[1]) -
                parseFloat(this.state.overideTotalSumOfOthers)
              ).toFixed(2)
            : parseFloat(this.calculateOthersSUM()[1]).toFixed(2)
        }
      }
    };
    this.props.addTable(dataToSend);
    this.props.makeEmptySellItem("others");
    this.othersStateReset();
  };
  render() {
    const detailsModalActions = [
      <FlatButton
        label="Delete"
        secondary={true}
        onClick={this.handleDetailsModelDeleteAction}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDetailsModelClose}
      />
    ];
    return (
      <div>
        {/* Aluminium Table div start */}
        {this.haveAluminiumType() && (
          <Card
            className="animated rollIn"
            style={{ margin: "10px", backgroundColor: "#CFD8DC" }}
          >
            <div>
              <Table
                bodyStyle={{ overflow: "visible", width: "-fit-content" }}
                height="400px"
                style={{ tableLayout: "auto", backgroundColor: "#CFD8DC" }}
                fixedHeader={false}
                fixedFooter={true}
                onCellClick={this.handleAluminiumRowClick}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan="9"
                      tooltip="List of Aluminium Sells Table"
                      style={{ textAlign: "center" }}
                    >
                      <h2>Aluminium Sells Table</h2>
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Name">
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Company">
                      Company
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Length">
                      Length
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Dia">
                      Dia
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Color">
                      Color
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Quantity">
                      Quantity
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Rate / Price">
                      Rate
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Price x Quantity">
                      Total
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {this.renderAluminiumTableRow()}
                </TableBody>
              </Table>
              <div>
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <div>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.aluminiumDiscountToggle}
                      onToggle={this.handleAluminiumDiscountToggle}
                    />
                  </div>
                  <div>
                    {this.state.aluminiumDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10, marginLeft: 10 }}
                          type="number"
                          value={this.state.aluminiumDiscount}
                          onChange={this.handleAluminiumDiscountChange}
                          hintText="Discount (%)"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {this.state.aluminiumDiscountToggle && (
                      <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                        Discount ={" "}
                        {this.calculateAluminiumSUM()[0] && (
                          <b>
                            {numeral(
                              parseFloat(this.calculateAluminiumSUM()[0])
                            ).format("0,0.00")}
                          </b>
                        )}
                      </h3>
                    )}
                  </div>

                  <div>
                    <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                      Result ={" "}
                      {this.calculateAluminiumSUM()[3] !== 0 &&
                      this.calculateAluminiumSUM()[3] ? (
                        <b>
                          {numeral(
                            parseFloat(this.calculateAluminiumSUM()[3])
                          ).format("0,0.00")}
                        </b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </div>
                  <div>
                    <TextField
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfAluminium}
                      onChange={this.handleoverideTotalSumOfAluminium}
                      hintText="Friendly Discount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <RaisedButton
                  style={{ margin: "5px" }}
                  label="Submit"
                  primary={true}
                  onClick={this.handleAluminiumTableSubmit}
                />
              </div>
            </div>
          </Card>
        )}
        {/* Aluminium Table div stop */}
        {/* Glass Table Row Start*/}
        {this.haveGlassType() && (
          <Card
            className="animated rollIn"
            style={{ margin: "10px", backgroundColor: "#CFD8DC" }}
          >
            <div>
              <Table
                bodyStyle={{ overflow: "visible", width: "-fit-content" }}
                height="400px"
                style={{ tableLayout: "auto", backgroundColor: "#CFD8DC" }}
                fixedHeader={false}
                fixedFooter={true}
                onCellClick={this.handleGlassRowClick}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan="5"
                      tooltip="List of Glass Sells Table"
                      style={{ textAlign: "center" }}
                    >
                      <h2>Glass Sells Table</h2>
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Name">
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product SFT">
                      SFT
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Rate / Price">
                      Rate
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="SFT x Rate">
                      Total
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {this.renderGlassTableRow()}
                </TableBody>
              </Table>
              <div>
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <div>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.glassDiscountToggle}
                      onToggle={this.handleGlassDiscountToggle}
                    />
                  </div>
                  <div>
                    {this.state.glassDiscountToggle && (
                      <div>
                        <TextField
                          style={{
                            marginBottom: 10,
                            marginLeft: 10
                          }}
                          type="number"
                          value={this.state.glassDiscount}
                          onChange={this.handleGlassDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    {this.state.glassDiscountToggle && (
                      <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                        Discount ={" "}
                        {this.calculateGlassSUM()[0] && (
                          <b>
                            {numeral(
                              parseFloat(this.calculateGlassSUM()[0])
                            ).format("0,0.00")}
                          </b>
                        )}
                      </h3>
                    )}
                  </div>
                  <div>
                    <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                      Result ={" "}
                      {this.calculateGlassSUM()[3] !== 0 &&
                      this.calculateGlassSUM()[3] ? (
                        <b>
                          {numeral(
                            parseFloat(this.calculateGlassSUM()[3])
                          ).format("0,0.00")}
                        </b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </div>
                  <div>
                    <TextField
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfGlass}
                      onChange={this.handleoverideTotalSumOfGlass}
                      hintText="Friendly Discount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <RaisedButton
                  style={{ margin: "5px" }}
                  label="Submit"
                  primary={true}
                  onClick={this.handleGlassTableSubmit}
                />
              </div>
            </div>
          </Card>
        )}
        {/* Glass Table Row Stop */}
        {/* SS Table Row Start */}
        {this.haveSSType() && (
          <Card
            className="animated rollIn"
            style={{ margin: "10px", backgroundColor: "#CFD8DC" }}
          >
            <div>
              <Table
                bodyStyle={{ overflow: "visible", width: "-fit-content" }}
                height="400px"
                style={{ tableLayout: "auto", backgroundColor: "#CFD8DC" }}
                fixedHeader={false}
                fixedFooter={true}
                onCellClick={this.handleSSRowClick}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan="8"
                      tooltip="List of SS Sells Table"
                      style={{ textAlign: "center" }}
                    >
                      <h2>SS Sells Table</h2>
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Name">
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Company">
                      Company
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Length">
                      Length
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Thickness">
                      Thickness
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Quantity">
                      Quantity
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Rate / Price">
                      Rate
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Price x Quantity">
                      Total
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {this.renderSSTableRow()}
                </TableBody>
              </Table>
              <div>
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <div>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.ssDiscountToggle}
                      onToggle={this.handleSSDiscountToggle}
                    />
                  </div>
                  <div>
                    {this.state.ssDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10, marginLeft: 10 }}
                          type="number"
                          value={this.state.ssDiscount}
                          onChange={this.handleSSDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {this.state.ssDiscountToggle && (
                      <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                        Discount ={" "}
                        {this.calculateSSSUM()[0] && (
                          <b>
                            {numeral(
                              parseFloat(this.calculateSSSUM()[0])
                            ).format("0,0.00")}
                          </b>
                        )}
                      </h3>
                    )}
                  </div>
                  <div>
                    <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                      Result ={" "}
                      {this.calculateSSSUM()[3] !== 0 &&
                      this.calculateSSSUM()[3] ? (
                        <b>
                          {numeral(parseFloat(this.calculateSSSUM()[3])).format(
                            "0,0.00"
                          )}
                        </b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </div>
                  <div>
                    <TextField
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfSS}
                      onChange={this.handleoverideTotalSumOfSS}
                      hintText="Friendly Discount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <RaisedButton
                  style={{ margin: "5px" }}
                  label="Submit"
                  primary={true}
                  onClick={this.handleSSTableSubmit}
                />
              </div>
            </div>
          </Card>
        )}
        {/* SS Table Row Stop */}
        {/* Others Table Row Start */}
        {this.haveOthersType() && (
          <Card
            className="animated rollIn"
            style={{ margin: "10px", backgroundColor: "#CFD8DC" }}
          >
            <div>
              <Table
                bodyStyle={{ overflow: "visible", width: "-fit-content" }}
                height="400px"
                style={{ tableLayout: "auto", backgroundColor: "#CFD8DC" }}
                fixedHeader={false}
                fixedFooter={true}
                onCellClick={this.handleOthersRowClick}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn
                      colSpan="5"
                      tooltip="List of Others Sells Table"
                      style={{ textAlign: "center" }}
                    >
                      <h2>Others Sells Table</h2>
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Name">
                      Name
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Quantity">
                      Quantity
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Product Rate / Price">
                      Rate
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="Price x Quantity">
                      Total
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {this.renderOthersTableRow()}
                </TableBody>
              </Table>
              {/* Footer of the table */}
              <div>
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <div>
                    <Toggle
                      style={{ marginTop: 8 }}
                      defaultToggled={this.state.othersDiscountToggle}
                      onToggle={this.handleOthersDiscountToggle}
                    />
                  </div>
                  <div>
                    {this.state.othersDiscountToggle && (
                      <div>
                        <TextField
                          style={{ marginBottom: 10, marginLeft: 10 }}
                          type="number"
                          value={this.state.othersDiscount}
                          onChange={this.handleOthersDiscountChange}
                          hintText="Discount (%)"
                          className="table-footer-discount"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {this.state.othersDiscountToggle && (
                      <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                        Discount ={" "}
                        {this.calculateOthersSUM()[0] && (
                          <b>
                            {numeral(
                              parseFloat(this.calculateOthersSUM()[0])
                            ).format("0,0.00")}
                          </b>
                        )}
                      </h3>
                    )}
                  </div>
                  <div>
                    <h3 style={{ marginTop: 8, marginLeft: 10 }}>
                      Result ={" "}
                      {this.calculateOthersSUM()[3] !== 0 &&
                      this.calculateOthersSUM()[3] ? (
                        <b>
                          {numeral(
                            parseFloat(this.calculateOthersSUM()[3])
                          ).format("0,0.00")}
                        </b>
                      ) : (
                        <b style={{ color: "red" }}>?</b>
                      )}
                    </h3>
                  </div>
                  <div>
                    <TextField
                      style={{ marginBottom: 10, marginLeft: 10 }}
                      type="number"
                      value={this.state.overideTotalSumOfOthers}
                      onChange={this.handleoverideTotalSumOfOthers}
                      hintText="Friendly Discount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <RaisedButton
                  style={{ margin: "5px" }}
                  label="Submit"
                  primary={true}
                  onClick={this.handleOthersTableSubmit}
                />
              </div>
            </div>
          </Card>
        )}
        {/* Others Table Row Stop */}

        {/* Finally All Table Total */}
        <div className="container">
          {(this.props.sellsTable.aluminium.length > 0 ||
            this.props.sellsTable.glass.length > 0 ||
            this.props.sellsTable.ss.length > 0 ||
            this.props.sellsTable.others.length > 0) && (
            <div
              style={{
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <Card
                style={{
                  textAlign: "center",
                  padding: 5,
                  marginBottom: 5,
                  backgroundColor: "#CFD8DC"
                }}
              >
                <span style={{ fontSize: "20px" }}>Table Hidden: </span>
                <div style={{ fontSize: "25px" }}>
                  Aluminium:{" "}
                  <span style={{ color: "red" }}>
                    <strong>{this.props.sellsTable.aluminium.length}</strong>
                  </span>{" "}
                  Glass:{" "}
                  <span style={{ color: "red" }}>
                    <strong>{this.props.sellsTable.glass.length}</strong>
                  </span>{" "}
                  Others:{" "}
                  <span style={{ color: "red" }}>
                    <strong>{this.props.sellsTable.others.length}</strong>
                  </span>{" "}
                  SS:{" "}
                  <span style={{ color: "red" }}>
                    <strong>{this.props.sellsTable.ss.length}</strong>
                  </span>
                </div>
              </Card>
              <Card
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  backgroundColor: "#CFD8DC"
                }}
              >
                <span
                  style={{
                    marginRight: 15,
                    fontSize: "30px"
                  }}
                >
                  <strong>
                    Totally ={" "}
                    {numeral(parseFloat(this.finallyAllTotal())).format(
                      "0,0.00"
                    )}
                  </strong>
                </span>
                <TextField
                  type="number"
                  value={this.state.finallyAllTotalField}
                  onChange={this.handleoveridefinallyAllTotal}
                  hintText="Final Friendly Discount"
                />
              </Card>
            </div>
          )}
        </div>
        {/* Model to Delete and Details */}
        <div>
          <Dialog
            title="Details : "
            actions={detailsModalActions}
            modal={false}
            open={this.state.detailsModelOpen}
            onRequestClose={this.handleDetailsModelClose}
          >
            {this.showDetailsToModel(
              this.state.ModalData.productCategoryToSell
            )}
          </Dialog>
        </div>
        {/* Model code End */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeSellItem: (id, productCategoryToSell) => {
      dispatch(removeSellItem(id, productCategoryToSell));
    },
    addTable: data => {
      dispatch(addTable(data));
    },
    makeEmptySellItem: category => {
      dispatch(makeEmptySellItem(category));
    }
  };
};

const mapStateToProps = state => {
  return {
    allSells: state.sells,
    sellsTable: state.sellsTable
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGenerator);
