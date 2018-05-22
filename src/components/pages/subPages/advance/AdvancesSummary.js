import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectAdvances from "./utility-func/advances";
import selectAdvancesTotal from "./utility-func/advances-total";

export const AdvancesSummary = ({ advanceCount, advancesTotal }) => {
  const advanceWord = advanceCount === 1 ? "advance" : "advances";
  const formattedAdvancesTotal = numeral(advancesTotal).format("0,0.00");
  return (
    <div className="content-container">
      <h1>
        Viewing <strong>{advanceCount}</strong> {advanceWord}, Total{" "}
        <strong>{formattedAdvancesTotal} &#x9f3;</strong>{" "}
      </h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleAdvances = selectAdvances(state.advance, state.filters);

  return {
    advanceCount: visibleAdvances.length,
    advancesTotal: selectAdvancesTotal(visibleAdvances)
  };
};

export default connect(mapStateToProps)(AdvancesSummary);
