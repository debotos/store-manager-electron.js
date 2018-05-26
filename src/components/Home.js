import React, { Component } from 'react';

import '../style/style.css';
import { Link } from 'react-router-dom';
import AppBarMain from './ui-element/AppBarMain';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import { startUpdateStoreInfo } from '../actions/storeInfo/store-info-actions';
import SnackBar from './ui-element/SnackBar';

import HomeDate from './clock/HomeDate';
// import WallClock from './clock/WallClock';
import TableClock from './clock/TableClock';
const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  link: {
    textDecoration: 'none',
    margin: '5px'
  },
  text: {
    marginTop: '3px'
  }
};

class Home extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End
  handleToggle = (event, toggled) => {
    this.setState({
      toggle: toggled
    });
  };
  handleReset = () => {
    this.setState({ name: '' });
    this.setState({ number1: '' });
    this.setState({ number2: '' });
    this.setState({ number3: '' });
    this.setState({ address: '' });
    this.setState({ password: '' });
  };
  handleNumber1 = event => {
    const number1 = event.target.value;
    if (!number1 || number1.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number1 });
    }
  };
  handleNumber2 = event => {
    const number2 = event.target.value;
    if (!number2 || number2.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number2 });
    }
  };
  handleNumber3 = event => {
    const number3 = event.target.value;
    if (!number3 || number3.match(/^\d{1,}(\.\d{0})?$/)) {
      this.setState({ number3 });
    }
  };
  handleName = event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleAddress = event => {
    const address = event.target.value;
    this.setState({ address });
  };
  handlePassword = event => {
    const password = event.target.value;
    this.setState({ password });
  };
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      snackBar: false,
      snackBarMessage: '',
      name: this.props.storeInfo.name,
      number1: this.props.storeInfo.number1,
      number2: this.props.storeInfo.number2,
      number3: this.props.storeInfo.number3,
      address: this.props.storeInfo.address,
      password: this.props.storeInfo.password
    };
  }
  handleUpdateStoreInfo = () => {
    let StoreInformation = {
      name: this.state.name,
      number1: this.state.number1,
      number2: this.state.number2,
      number3: this.state.number3,
      address: this.state.address,
      password: this.state.password
    };
    // console.log("Sending Call for update store info..");
    this.props.startUpdateStoreInfo(StoreInformation);
    this.showSnackBar('Info Successfully Updated.');
  };
  render() {
    return (
      <div>
        <AppBarMain />
        <div className="animated bounceInUp">
          <div
            className="container"
            style={{ marginTop: '20px', marginBottom: 0 }}
          >
            <div className="analog-clock">
              <div
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  paddingLeft: '50px'
                }}
              >
                <TableClock />
                {/* <WallClock /> */}
              </div>
              <br />
              <div className="backgroundinfo">
                <HomeDate />
              </div>
            </div>
            <h1 id="store-name" style={{ textAlign: 'center' }}>
              Store Management Software
            </h1>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={styles.wrapper}>
            <Link className="square_btn" style={styles.link} to="/">
              <h5 style={styles.text}>Home</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/readycash">
              <h5 style={styles.text}>Ready Cash</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/sell">
              <h5 style={styles.text}>Sells</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/fabrication">
              <h5 style={styles.text}>Fabrication</h5>
            </Link>
            <Link
              className="square_btn"
              style={styles.link}
              to="/others-income"
            >
              <h5 style={styles.text}>Others Income</h5>
            </Link>
            {/* <Link to="/bank">Bank</Link> */}
            <Link className="square_btn" style={styles.link} to="/expenses">
              <h5 style={styles.text}>Expenses</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/due">
              <h5 style={styles.text}>Due</h5>
            </Link>
            {/* <Link to="/employee">Employee</Link> */}
            <Link className="square_btn" style={styles.link} to="/moneyreceipt">
              <h5 style={styles.text}>Money Receipt</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/pad">
              <h5 style={styles.text}>Pad</h5>
            </Link>
            {/* <Link to="/salary">Salary</Link> */}
            <Link className="square_btn" style={styles.link} to="/stock">
              <h5 style={styles.text}>Stock</h5>
            </Link>
            <Link className="square_btn" style={styles.link} to="/advance">
              <h5 style={styles.text}>Advance</h5>
            </Link>
          </div>
        </div>
        {/* Toggle Section */}
        <div
          style={{ marginLeft: '47%', marginRight: '47%', marginTop: '10px' }}
        >
          <Toggle
            onToggle={this.handleToggle}
            defaultToggled={this.state.toggle}
          />
        </div>
        {/* Form Section */}
        {this.state.toggle && (
          <div className="container">
            <Card style={{ padding: 10, marginTop: 10, marginBottom: 10 }}>
              <h4 style={{ textAlign: 'center' }}>
                <strong>Place The Details for PDF :</strong>
              </h4>
              <div style={{ marginLeft: 20 }}>
                <TextField
                  value={this.state.name}
                  onChange={this.handleName}
                  hintText="COMPANY NAME"
                  floatingLabelText="COMPANY NAME"
                />

                <TextField
                  type="number"
                  value={this.state.number1}
                  onChange={this.handleNumber1}
                  hintText="Phone Number One"
                  floatingLabelText="Phone 1 (Unique) "
                />

                <TextField
                  type="number"
                  value={this.state.number2}
                  onChange={this.handleNumber2}
                  hintText="Phone Number Two"
                  floatingLabelText="Phone 2 (Unique) "
                />

                <TextField
                  type="number"
                  value={this.state.number3}
                  onChange={this.handleNumber3}
                  hintText="Phone Number Three"
                  floatingLabelText="Phone 3 (Unique) "
                />

                <TextField
                  value={this.state.address}
                  onChange={this.handleAddress}
                  hintText="COMPANY ADDRESS"
                  floatingLabelText="COMPANY ADDRESS "
                  fullWidth={true}
                />
                <TextField
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                  hintText="Store Password Here"
                  floatingLabelText="Password Here"
                />
              </div>
              <CardActions>
                <FlatButton
                  disabled={
                    this.state.name ||
                    this.state.number1 ||
                    this.state.number2 ||
                    this.state.number3 ||
                    this.state.address
                      ? false
                      : true
                  }
                  secondary={true}
                  label="Reset"
                  onClick={this.handleReset}
                />
                <FlatButton
                  disabled={
                    this.state.name &&
                    this.state.number1 &&
                    this.state.number2 &&
                    this.state.address
                      ? false
                      : true
                  }
                  primary={true}
                  label="Save For PDF"
                  onClick={this.handleUpdateStoreInfo}
                />
              </CardActions>
            </Card>
          </div>
        )}
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startUpdateStoreInfo: data => {
      dispatch(startUpdateStoreInfo(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
