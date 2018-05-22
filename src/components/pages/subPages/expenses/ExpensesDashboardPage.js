import React from "react";
import ExpenseList from "./ExpensesList";
import ExpenseListFilters from "./ExpensesListFilters";
import ExpensesSummary from "./ExpensesSummary";
import { Card } from "material-ui/Card";

const ExpenseDashboardPage = props => (
  <div>
    <Card className="expenses-summary-card">
      <ExpensesSummary />
    </Card>

    <Card className="container" style={{ marginTop: 10, padding: 10 }}>
      <ExpenseListFilters />
    </Card>

    <Card
      className="container"
      style={{ marginTop: 10, padding: 5, marginBottom: 230 }}
    >
      <div className="list-header">
        <div>
          <strong>Expenses</strong>
        </div>
        <div>
          <strong>Amount</strong>
        </div>
      </div>

      <ExpenseList showSnackBar={props.showSnackBar} />
    </Card>
  </div>
);

export default ExpenseDashboardPage;
