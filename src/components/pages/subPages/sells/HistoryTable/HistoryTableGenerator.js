import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import numeral from "numeral";
import SvgIcon from "material-ui/SvgIcon";
import TextField from "material-ui/TextField";

import { startDeleteSellUnderCustomerHistory } from "../../../../../actions/sells/sells-history-actions";
import GENERATE_PDF from "../PDF";

const uuidv4 = require("uuid/v4");
// {this.props.allTables} returning [Array of object]

class HistoryTableGenerator extends Component {
  handleOpen = () => {
    this.setState({ modelOpen: true });
  };

  handleClose = () => {
    this.setState({ modelOpen: false });
  };

  handleFinalOpen = () => {
    this.setState({ finalModelOpen: true });
  };

  handleFinalClose = () => {
    this.setState({ finalModelOpen: false });
  };
  handleSingleHistoryDeleteConfirmDialogOpen = () => {
    this.setState({ singleHistoryDeleteConfirm: true });
  };

  handleSingleHistoryDeleteConfirmDialogClose = () => {
    this.setState({ singleHistoryDeleteConfirm: false });
    this.setState({ confirmButton: true });
    this.setState({ password: "" });
  };
  handleConfirmPassword = event => {
    let password = event.target.value;
    this.setState({ password });
    if (String(password) === String(this.props.storeInfo.password)) {
      this.setState({ confirmButton: false });
    } else {
      this.setState({ confirmButton: true });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      modelOpen: false,
      modelData: "",
      finalModelOpen: false,
      finalModelData: "",
      date: "",
      customer: "",
      confirmButton: true,
      password: "",
      singleHistoryDeleteConfirm: false,
      singleHistoryDeleteId: "",
      singleHistoryDeleteNumber: ""
    };
  }
  // Give me an array of object whose type is others and i will render a tabel
  renderOthersTableRow = others => {
    let id = 0;
    return others.map((singleItem, index) => {
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
    });
  };
  renderOthersTable = others => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
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
            {this.renderOthersTableRow(others.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(others.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is ss and i will render a tabel
  renderSSTableRow = ss => {
    let id = 0;
    return ss.map((singleItem, index) => {
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
    });
  };
  renderSSTable = ss => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
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
            {this.renderSSTableRow(ss.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(ss.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is aluminium and i will render a tabel
  renderAluminiumTableRow = aluminium => {
    let id = 0;
    return aluminium.map((singleItem, index) => {
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
    });
  };

  renderAluminiumTable = aluminium => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Company">
                Company
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Length">
                Length
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Dia">Dia</TableHeaderColumn>
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
            {this.renderAluminiumTableRow(aluminium.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(aluminium.attribute)}
          />
        </div>
      </div>
    );
  };
  // Give me an array of object whose type is glass and i will render a tabel
  renderGlassTableRow = glass => {
    let id = 0;
    return glass.map((singleItem, index) => {
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
    });
  };
  renderGlassTable = glass => {
    return (
      <div key={uuidv4()}>
        <Table
          bodyStyle={{ overflow: "visible", width: "-fit-content" }}
          height="200px"
          style={{ tableLayout: "auto" }}
          fixedHeader={false}
          fixedFooter={false}
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
              <TableHeaderColumn tooltip="Product Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product SFT">SFT</TableHeaderColumn>
              <TableHeaderColumn tooltip="Product Rate / Price">
                Rate
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="SFT x Rate">Total</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {this.renderGlassTableRow(glass.table)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center", margin: 5 }}>
          <FlatButton
            label="More Details"
            onClick={() => this.handleDetailsButton(glass.attribute)}
          />
        </div>
      </div>
    );
  };
  handleDetailsButton = attribute => {
    this.setState({ modelData: attribute });
    this.handleOpen();
  };
  getAndShowModelData = () => {
    let modelData = this.state.modelData;
    return (
      <div>
        <strong>
          All Total ={" "}
          {numeral(parseFloat(modelData.allCellTotal)).format("0,0.00")}
        </strong>{" "}
        <br />
        <strong>Discount = {modelData.discount} %</strong>
        <br />
        <strong>
          Discount Amount ={" "}
          {numeral(parseFloat(modelData.discountAmount)).format("0,0.00")}{" "}
        </strong>
        <br />
        <strong>
          After Discount ={" "}
          {numeral(parseFloat(modelData.afterDiscountTotal)).format("0,0.00")}{" "}
        </strong>
        <br />
        <strong>
          Friendly Discount ={" "}
          {numeral(parseFloat(modelData.friendlyDiscount)).format("0,0.00")}{" "}
        </strong>
        <br />
        <strong>
          After Friendly Discount ={" "}
          {numeral(parseFloat(modelData.afterFriendlyDiscountTotal)).format(
            "0,0.00"
          )}{" "}
        </strong>
        <br />
        <strong>
          Finally Total ={" "}
          {numeral(parseFloat(modelData.atLastTotalAll)).format("0,0.00")}
        </strong>{" "}
        <br />
      </div>
    );
  };
  handleFinalDetailsButton = (data, date, customer) => {
    this.setState({ finalModelData: data });
    this.setState({ date });
    this.setState({ customer });
    this.handleFinalOpen();
  };
  getAndShowFinalModelData = () => {
    let finalModelData = this.state.finalModelData;
    let { deposit, prevDue, totalWithDue, newDue } = this.state.customer;
    return (
      <div>
        <strong>
          All Table Total ={" "}
          {numeral(parseFloat(finalModelData.total)).format("0,0.00")} <br />
          Friendly Discount ={" "}
          {numeral(parseFloat(finalModelData.finalFriendlyDiscount)).format(
            "0,0.00"
          )}{" "}
          <br />
          <span style={{ color: "green" }}>
            After Friendly Discount ={" "}
            {numeral(parseFloat(finalModelData.finalTotal)).format("0,0.00")}
          </span>{" "}
          <br />
          <span style={{ color: "red" }}>
            [{this.state.date}] At the time of Saving History Previous Due is ={" "}
            {numeral(parseFloat(prevDue)).format("0,0.00")}
          </span>{" "}
          <br />
          <span style={{ color: "green" }}>
            Amount After Friendly Discount + Previous Due [ BILL HAVE TO PAY ] ={" "}
            {numeral(parseFloat(totalWithDue)).format("0,0.00")}
          </span>{" "}
          <br />
          <span style={{ color: "blue" }}>
            Deposited = {numeral(parseFloat(deposit)).format("0,0.00")}
          </span>{" "}
          <br />
          <span style={{ color: "red" }}>
            At the time of Saving History Left with Due ={" "}
            {numeral(parseFloat(newDue)).format("0,0.00")}{" "}
          </span>
        </strong>
      </div>
    );
  };
  renderTable = () => {
    return this.props.allTables.map((singleSell, index) => {
      // {singleSell} is an [Object]
      // Destructuring the singleItem Object
      let { aluminium, glass, ss, others, date } = singleSell.items;
      // {aluminium, glass, ss, others} each one containing an [array of objects]
      let AluminiumTable = [];
      let GlassTable = [];
      let SSTable = [];
      let OthersTable = [];

      if (aluminium && aluminium.length > 0) {
        aluminium.forEach(singleItem => {
          AluminiumTable.push(this.renderAluminiumTable(singleItem));
        });
      }

      if (glass && glass.length > 0) {
        glass.forEach(singleItem => {
          GlassTable.push(this.renderGlassTable(singleItem));
        });
      }

      if (ss && ss.length > 0) {
        ss.forEach(singleItem => {
          SSTable.push(this.renderSSTable(singleItem));
        });
      }

      if (others && others.length > 0) {
        others.forEach(singleItem => {
          OthersTable.push(this.renderOthersTable(singleItem));
        });
      }

      return (
        <div key={index} style={{ margin: "5px" }}>
          <Card
            className="animated bounceIn"
            style={{
              backgroundColor: "#CFD8DC"
            }}
          >
            <CardHeader
              title={`${this.toTitleCase(singleSell.customer.name)} ${
                singleSell.customer.number
              } ${singleSell.customer.mail}`}
              subtitle={`Memo No: ${singleSell.memoNumber} Date: ${date}`}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              {AluminiumTable}
              {GlassTable}
              {SSTable}
              {OthersTable}
            </CardText>

            <CardActions>
              <RaisedButton
                style={{ margin: 5 }}
                label="Final Sell Details"
                onClick={() =>
                  this.handleFinalDetailsButton(
                    singleSell.allTotal,
                    date,
                    singleSell.customer
                  )
                }
              />
              <RaisedButton
                style={{ margin: 5 }}
                primary={true}
                label="Print"
                icon={
                  <SvgIcon>
                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                  </SvgIcon>
                }
                onClick={() => this.handleHistoryPrint(singleSell, date)}
              />
              <RaisedButton
                style={{ margin: 5 }}
                secondary={true}
                label="Delete"
                onClick={() =>
                  this.handleSellHistoryDelete(
                    singleSell.id,
                    singleSell.customer.number
                  )
                }
              />
            </CardActions>
          </Card>
        </div>
      );
    });
  };
  handleHistoryPrint = (singleSell, date) => {
    const dataForPDF = {
      tables: singleSell.items,
      customer: {
        name: singleSell.customer.name,
        number: singleSell.customer.number,
        mail: singleSell.customer.mail,
        address: singleSell.customer.address,
        allTotal: singleSell.allTotal,
        prevDue: singleSell.customer.prevDue,
        totalWithDue: singleSell.customer.totalWithDue,
        depositNow: singleSell.customer.deposit,
        newDue: singleSell.customer.newDue
      },
      memoNumber: singleSell.memoNumber,
      storeInfo: this.props.storeInfo
    };
    console.log("====================================");
    console.log("History PDF generator sending Date ", date);
    console.log("====================================");
    GENERATE_PDF(dataForPDF, date);
  };
  handleSellHistoryDelete = (id, number) => {
    this.setState({ singleHistoryDeleteId: id });
    this.setState({ singleHistoryDeleteNumber: number });
    this.handleSingleHistoryDeleteConfirmDialogOpen();
  };
  handleSingleHistoryDelete = () => {
    this.props.startDeleteSellUnderCustomerHistory(
      this.state.singleHistoryDeleteId,
      this.state.singleHistoryDeleteNumber
    );
    this.handleSingleHistoryDeleteConfirmDialogClose();
  };
  toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  render() {
    const actions = [
      <FlatButton label="Okey" primary={true} onClick={this.handleClose} />
    ];
    const finalActions = [
      <FlatButton label="Okey" primary={true} onClick={this.handleFinalClose} />
    ];
    const singleHistoryDeleteConfirmModelActions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleSingleHistoryDeleteConfirmDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        disabled={this.state.confirmButton}
        onClick={this.handleSingleHistoryDelete}
      />
    ];
    return (
      <div>
        {this.renderTable()}
        <div>
          <Dialog
            title="Table Details"
            actions={actions}
            modal={true}
            open={this.state.modelOpen}
          >
            {this.getAndShowModelData()}
          </Dialog>
          <Dialog
            title="Final Details Of This Sell"
            actions={finalActions}
            modal={true}
            open={this.state.finalModelOpen}
          >
            {this.getAndShowFinalModelData()}
          </Dialog>
          <Dialog
            actions={singleHistoryDeleteConfirmModelActions}
            modal={false}
            open={this.state.singleHistoryDeleteConfirm}
            title="Are you Sure ?"
            onRequestClose={this.handleSingleHistoryDeleteConfirmDialogClose}
          >
            <TextField
              type="password"
              floatingLabelText="Comfirm The Password"
              value={this.state.password}
              onChange={this.handleConfirmPassword}
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startDeleteSellUnderCustomerHistory: (id, number) => {
      dispatch(startDeleteSellUnderCustomerHistory(id, number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  HistoryTableGenerator
);
