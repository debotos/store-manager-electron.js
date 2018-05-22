import React from "react";
import IncomeList from "./IncomesList";
import IncomeListFilters from "./IncomesListFilters";
import IncomesSummary from "./IncomesSummary";
import { Card } from "material-ui/Card";

const IncomeDashboardPage = props => (
  <div>
    <Card className="expenses-summary-card">
      <IncomesSummary />
    </Card>

    <Card className="container" style={{ marginTop: 10, padding: 10 }}>
      <IncomeListFilters />
    </Card>

    <Card
      className="container"
      style={{ marginTop: 10, padding: 5, marginBottom: 230 }}
    >
      <div className="list-header">
        <div>
          <strong>Incomes</strong>
        </div>
        <div>
          <strong>Amount</strong>
        </div>
      </div>

      <IncomeList showSnackBar={props.showSnackBar} />
    </Card>
  </div>
);

export default IncomeDashboardPage;
