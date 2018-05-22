import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectIncomes from "./utility-func/incomes";
import selectIncomesTotal from "./utility-func/incomes-total";

export const IncomesSummary = ({ incomeCount, incomesTotal }) => {
  const incomeWord = incomeCount === 1 ? "income" : "incomes";
  const formattedIncomesTotal = numeral(incomesTotal).format("0,0.00");
  return (
    <div className="content-container">
      <h1>
        Viewing <strong>{incomeCount}</strong> {incomeWord}, Total{" "}
        <strong>{formattedIncomesTotal} &#x9f3;</strong>{" "}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleIncomes = selectIncomes(state.income, state.filters);

  return {
    incomeCount: visibleIncomes.length,
    incomesTotal: selectIncomesTotal(visibleIncomes)
  };
};

export default connect(mapStateToProps)(IncomesSummary);
