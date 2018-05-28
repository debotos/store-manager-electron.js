import React, { Component } from 'react';
import { FilePicker } from 'react-file-picker';

import SnackBar from '../ui-element/SnackBar';
import AppBarMain from '../ui-element/AppBarMain';

import startBackup from '../../actions/backup/backup';
import startRestore from '../../actions/backup/restore';

import '../../style/backup-restore.css';

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
    startRestore(this.state.file.path);
  };

  state = {
    isWorking: false,
    snackBar: false,
    snackBarMessage: '',
    btnStatus: 'Click To Select Database',
    file: null
  };
  render() {
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
                  onClick={this.handleRestore}
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
      </div>
    );
  }
}

export default Backup;
