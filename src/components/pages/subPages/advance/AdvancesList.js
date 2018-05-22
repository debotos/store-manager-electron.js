import React from "react";
import { connect } from "react-redux";
import AdvanceListItem from "./AdvanceListItem";
import selectAdvances from "./utility-func/advances";

export const AdvanceList = props => (
  <div className="content-container">
    <div className="list-body">
      {props.advances.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>
            <b>No advances</b>
          </span>
        </div>
      ) : (
        props.advances.map(advance => {
          return (
            <AdvanceListItem
              showSnackBar={props.showSnackBar}
              key={advance.id}
              {...advance}
            />
          );
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  advances: selectAdvances(state.advance, state.advanceFilter)
});

export default connect(mapStateToProps, null)(AdvanceList);
