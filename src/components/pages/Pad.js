import React, { Component } from 'react';
import AppBarMain from '../ui-element/AppBarMain';
import '../../style/pad/pad.css';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
// import Navigation from "../Navigation";
// import TableClock from '../clock/TableClock';
var PrintTemplate = require('react-print');

class Pad extends Component {
  print = () => {
    window.print();
  };
  constructor(props) {
    super(props);
    this.state = {
      note: ''
    };
  }

  onNoteChange = event => {
    const note = event.target.value;
    this.setState({ note });
  };
  render() {
    return (
      <div className="background">
        <div id="react-no-print">
          <AppBarMain title={'Your Pad'} />
          <div className="container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <h1 id="title-heading"> PAD</h1>
              {/* <TableClock /> */}
            </div>
          </div>
          <div style={{ marginTop: 10 }} className="container">
            <Card
              className="animated flip"
              style={{
                padding: 15,
                borderRadius: '20px',
                backgroundColor: 'lightblue'
              }}
            >
              <textarea
                style={{
                  borderRadius: '20px'
                }}
                className="textarea"
                placeholder="Add your note "
                value={this.state.note}
                onChange={this.onNoteChange}
              />
            </Card>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <RaisedButton
              className="animated infinite tada"
              primary={true}
              onClick={this.print}
              label="print"
            />
          </div>
        </div>
        <br />
        <div id="print-mount">
          <PrintTemplate>
            <div>
              <h1 style={{ textAlign: 'center' }}>
                {this.props.storeInfo.name}
              </h1>
              <h3 style={{ textAlign: 'center' }}>PAD</h3>
              <div className="header">
                <div>
                  {/* Left part */}
                  <strong>For All Kinds of - </strong>
                  <br />
                  Glass SS Pipe<br />
                  Thai Aluminium<br />
                  False Celling<br />
                  Accessories
                </div>
                {/* middle part */}

                {/* Right part */}
                <div>
                  <strong>show Room & Sales Center</strong>
                  <br />
                  {this.props.storeInfo.address.substr(0, 29)}
                  <br />
                  {this.props.storeInfo.address.substr(29, 36)}
                  <br />
                  phone numbers:{' ' + this.props.storeInfo.number1 + ','}
                  <br />
                  {this.props.storeInfo.number2 +
                    ', ' +
                    this.props.storeInfo.number3}
                </div>
              </div>
              <hr />
              <br />
              <div className="content" style={{ fontSize: 'x-large' }}>
                {this.state.note}
              </div>
            </div>
          </PrintTemplate>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};

export default connect(mapStateToProps, null)(Pad);
