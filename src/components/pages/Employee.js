import React, { Component } from "react";

import AppBarMain from "../ui-element/AppBarMain";
// import Navigation from "../Navigation";

class Employee extends Component {
  render() {
    return (
      <div>
        <AppBarMain title={"Employee"} />
        <h1>Employee.js</h1>
      </div>
    );
  }
}

export default Employee;
