import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/readycash">Ready Cash</Link>
        <Link to="/sell">Sells</Link>
        <Link to="/fabrication">Fabrication</Link>
        <Link to="/others-income">Others Income</Link>
        {/* <Link to="/bank">Bank</Link> */}
        <Link to="/expenses">Expenses</Link>
        <Link to="/due">Due</Link>
        {/* <Link to="/employee">Employee</Link> */}
        <Link to="/moneyreceipt">Money Receipt</Link>
        <Link to="/pad">Pad</Link>
        {/* <Link to="/salary">Salary</Link> */}
        <Link to="/stock">Stock</Link>
        <Link to="/advance">Advance</Link>
        <Link to="/backup">Backup</Link>
      </div>
    );
  }
}

export default Navigation;
