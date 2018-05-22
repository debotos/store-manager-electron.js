import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "./utility-func/expenses";

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>
            <b>No expenses</b>
          </span>
        </div>
      ) : (
        props.expenses.map(expense => {
          return (
            <ExpenseListItem
              showSnackBar={props.showSnackBar}
              key={expense.id}
              {...expense}
            />
          );
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps, null)(ExpenseList);
