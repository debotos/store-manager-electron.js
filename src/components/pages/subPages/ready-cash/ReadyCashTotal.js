import React, { Component } from "react";
import { Card } from "material-ui/Card";
import numeral from "numeral";

class ReadyCashTotal extends Component {
  calculateIncomeTotal = () => {
    let incomeTotal = 0;
    this.props.readyCash.income.forEach(singleItem => {
      incomeTotal = parseFloat(incomeTotal) + parseFloat(singleItem.amount);
    });
    return incomeTotal;
  };
  calculateExpensesTotal = () => {
    let expensesTotal = 0;
    this.props.readyCash.expenses.forEach(singleItem => {
      expensesTotal = parseFloat(expensesTotal) + parseFloat(singleItem.amount);
    });
    return expensesTotal;
  };

  render() {
    return (
      <Card
        style={{
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          textAlign: "center"
        }}
      >
        <div className="row">
          <div className="col-sm-6" style={{ marginBottom: 10 }}>
            <Card style={{ padding: 10 }}>
              <h5 style={{ color: "green" }}>
                <strong>Total Today's Income &#8595;</strong>
              </h5>
              <h2>
                {numeral(parseFloat(this.calculateIncomeTotal())).format(
                  "0,0.00"
                )}{" "}
                &#x9f3;
              </h2>
            </Card>
          </div>
          <div className="col-sm-6">
            <Card style={{ padding: 10 }}>
              <h5 style={{ color: "green" }}>
                <strong>Total Today's Expenses &#8595;</strong>
              </h5>
              <h2>
                {numeral(parseFloat(this.calculateExpensesTotal())).format(
                  "0,0.00"
                )}{" "}
                &#x9f3;
              </h2>
            </Card>
          </div>
        </div>

        <Card style={{ padding: 10 }}>
          <div>
            <h5 style={{ color: "green" }}>
              <strong>
                Today's Ready Cash = ( Previous Day Ready Cash + Today's Income
                ) - ( Today's Expenses ) &#8595;
              </strong>
            </h5>
            <h2>
              {numeral(
                parseFloat(
                  parseFloat(this.props.readyCashAmount) +
                    this.calculateIncomeTotal() -
                    this.calculateExpensesTotal()
                )
              ).format("0,0.00")}{" "}
              &#x9f3;
            </h2>
          </div>
        </Card>
      </Card>
    );
  }
}

export default ReadyCashTotal;
