import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "./utility-func/expenses";
import selectExpensesTotal from "./utility-func/expenses-total";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = numeral(expensesTotal).format("0,0.00");
  return (
    <div className="content-container">
      <h1>
        Viewing <strong>{expenseCount}</strong> {expenseWord}, Total{" "}
        <strong>{formattedExpensesTotal} &#x9f3;</strong>{" "}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
