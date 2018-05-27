import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import { history } from '../Router';

const styles = {
  link: {
    textDecoration: 'none',
    fontWeight: 400,
    color: 'black'
  }
};

export default props => (
  <div>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/');
      }}
    >
      <Link style={styles.link} to="/">
        Home
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/readycash');
      }}
    >
      <Link style={styles.link} to="/readycash">
        Ready Cash
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/sell');
      }}
    >
      <Link style={styles.link} to="/sell">
        Sells
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/fabrication');
      }}
    >
      <Link style={styles.link} to="/fabrication">
        Fabrication
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/others-income');
      }}
    >
      <Link style={styles.link} to="/others-income">
        Others Income
      </Link>
    </MenuItem>
    {/* <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/bank");
      }}
    >
    <Link to="/bank">Bank</Link>
    </MenuItem> */}
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/expenses');
      }}
    >
      <Link style={styles.link} to="/expenses">
        Expenses
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/due');
      }}
    >
      <Link style={styles.link} to="/due">
        Due
      </Link>
    </MenuItem>
    {/* <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/employee");
      }}
    >
      <Link to="/employee">Employee</Link>
    </MenuItem> */}

    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/moneyreceipt');
      }}
    >
      <Link style={styles.link} to="/moneyreceipt">
        Money Receipt
      </Link>
    </MenuItem>
    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/pad');
      }}
    >
      <Link style={styles.link} to="/pad">
        Pad
      </Link>
    </MenuItem>

    {/* <MenuItem
      onClick={() => {
        props.handleClose();
        history.push("/salary");
      }}
    >
      <Link to="/salary">Salary</Link>
    </MenuItem> */}

    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/stock');
      }}
    >
      <Link style={styles.link} to="/stock">
        Stock
      </Link>
    </MenuItem>

    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/advance');
      }}
    >
      <Link style={styles.link} to="/advance">
        Advance
      </Link>
    </MenuItem>

    <MenuItem
      onClick={() => {
        props.handleClose();
        history.push('/backup');
      }}
    >
      <Link style={styles.link} to="/backup">
        Backup
      </Link>
    </MenuItem>
  </div>
);
