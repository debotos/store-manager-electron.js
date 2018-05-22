import React from "react";
import { connect } from "react-redux";
import IncomeListItem from "./IncomeListItem";
import selectIncomes from "./utility-func/incomes";

export const IncomeList = props => (
  <div className="content-container">
    <div className="list-body">
      {props.incomes.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>
            <b>No incomes</b>
          </span>
        </div>
      ) : (
        props.incomes.map(income => {
          return (
            <IncomeListItem
              showSnackBar={props.showSnackBar}
              key={income.id}
              {...income}
            />
          );
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  incomes: selectIncomes(state.income, state.incomeFilter)
});

export default connect(mapStateToProps, null)(IncomeList);
