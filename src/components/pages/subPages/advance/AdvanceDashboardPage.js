import React from "react";
import AdvanceList from "./AdvancesList";
import AdvancesSummary from "./AdvancesSummary";
import AdvanceListFilters from "./AdvancesListFilters";
import { Card } from "material-ui/Card";

const AdvanceDashboardPage = props => (
  <div>
    <Card className="expenses-summary-card">
      <AdvancesSummary />
    </Card>

    <Card className="container" style={{ marginTop: 10, padding: 10 }}>
      <AdvanceListFilters />
    </Card>

    <Card
      className="container"
      style={{ marginTop: 10, padding: 5, marginBottom: 230 }}
    >
      <div className="list-header">
        <div>
          <strong>Advances</strong>
        </div>
        <div>
          <strong>Amount</strong>
        </div>
      </div>

      <AdvanceList showSnackBar={props.showSnackBar} />
    </Card>
  </div>
);

export default AdvanceDashboardPage;
