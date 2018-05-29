import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilePicker } from 'react-file-picker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import SnackBar from '../ui-element/SnackBar';
import AppBarMain from '../ui-element/AppBarMain';

import startBackup from '../../actions/backup/backup';
import startRestore from '../../actions/backup/restore';

import db from '../../secrets/neDB';
import '../../style/backup-restore.css';

const { getCurrentWindow } = window.require('electron').remote;

class Backup extends Component {
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

  handleBackup = () => {
    this.setState({ isWorking: true });
    setTimeout(() => {
      startBackup()
        .then(() => {
          this.setState({ isWorking: false });
          this.showSnackBar('Successfull! Check Your Desktop!');
        })
        .catch(e => {
          this.setState({ isWorking: false });
          this.showSnackBar('Failed to Backup!');
          console.log('Failed Backup => ', e);
        });
    }, 3000);
  };

  handleFileInput = FileObject => {
    // console.log(FileObject);
    this.setState({ btnStatus: FileObject.name.substr(0, 15) });
    if (FileObject) {
      this.setState({ file: FileObject });
    } else {
      this.setState({ file: null });
    }
  };

  handleRestore = () => {
    this.handleClose();
    this.setState({ isWorking: true });
    setTimeout(() => {
      startRestore(this.state.file.path)
        .then(() => {
          this.setState({ isWorking: false });
          this.showSnackBar('Restore Successfull! Restarting....');
          setTimeout(() => {
            getCurrentWindow().reload();
          }, 1000);
        })
        .catch(e => {
          this.setState({ isWorking: false });
          this.showSnackBar('Failed to Restore!');
          console.log('Failed Restore => ', e);
        });
    }, 3000);
  };

  state = {
    isWorking: false,
    snackBar: false,
    snackBarMessage: '',
    btnStatus: 'Click To Select Database',
    file: null,
    confirmButton: true,
    password: '',
    open: false
  };
  handleConfirmPassword = event => {
    let password = event.target.value;
    this.setState({ password });
    if (String(password) === String(this.props.storeInfo.password)) {
      this.setState({ confirmButton: false });
    } else {
      this.setState({ confirmButton: true });
    }
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ confirmButton: true });
    this.setState({ password: '' });
  };
  render() {
    const actions = [
      <FlatButton label="Cancel" secondary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Confirm Restore"
        disabled={this.state.confirmButton}
        primary={true}
        onClick={this.handleRestore}
      />
    ];
    return (
      <div>
        <AppBarMain title={'Backup Database'} />
        {!this.state.isWorking ? (
          <div className="backup-restore-container">
            <div className="backupContainer">
              <p id="title-heading">Backup Data</p>
              <br />
              <a
                style={{ textDecoration: 'none' }}
                href="javascript:void(0);"
                className="backup-restore-btn"
                onClick={this.handleBackup}
              >
                Backup
              </a>
            </div>
            <div className="restoreContainer">
              <p id="title-heading">Restore Data</p>
              <br />
              <FilePicker
                extensions={['json']}
                onChange={this.handleFileInput}
                onError={errMsg => {
                  console.log('Error =>> ', errMsg);
                  this.setState({ file: null });
                  this.setState({ btnStatus: 'Click To Select Database' });
                  this.showSnackBar(
                    'Error! Database file have .json extension!'
                  );
                }}
              >
                <button className="restore-button">
                  {this.state.btnStatus}
                </button>
              </FilePicker>
              <br />
              {this.state.file && (
                <a
                  style={{ textDecoration: 'none' }}
                  href="javascript:void(0);"
                  className="backup-restore-btn"
                  onClick={this.handleOpen}
                >
                  Restore
                </a>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h4
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '34rem'
              }}
            >
              working....
            </h4>
            <div className="backup-loader">
              <div className="backup-loader-inner">
                <div className="backup-loader-line-wrap">
                  <div className="backup-loader-line" />
                </div>
                <div className="backup-loader-line-wrap">
                  <div className="backup-loader-line" />
                </div>
                <div className="backup-loader-line-wrap">
                  <div className="backup-loader-line" />
                </div>
                <div className="backup-loader-line-wrap">
                  <div className="backup-loader-line" />
                </div>
                <div className="backup-loader-line-wrap">
                  <div className="backup-loader-line" />
                </div>
              </div>
            </div>
          </div>
        )}
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          title={
            <div>
              <h3 style={{ margin: 0, padding: 0 }}>Are You Sure? </h3>
              <br />
              <p style={{ color: 'orange', margin: 0, padding: 0 }}>
                Warning: Everything(now have) is going to be{' '}
                <p
                  style={{
                    color: 'red',
                    margin: 0,
                    padding: 0,
                    display: 'inline'
                  }}
                >
                  Deleted!
                </p>
              </p>
              <p>
                Selected File =>{' '}
                <p
                  style={{
                    color: 'green',
                    margin: 0,
                    padding: 0,
                    display: 'inline'
                  }}
                >
                  {this.state.file && this.state.file.name}
                </p>
              </p>
              <p>
                Note that, after Restore Process, Software is going to start
                with the data backed up on => {this.state.btnStatus}
              </p>
            </div>
          }
          onRequestClose={this.handleClose}
        >
          <TextField
            type="password"
            floatingLabelText="Comfirm The Password"
            value={this.state.password}
            onChange={this.handleConfirmPassword}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeInfo: state.storeInfo
  };
};

export default connect(mapStateToProps, null)(Backup);
