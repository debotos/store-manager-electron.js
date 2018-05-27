import React, { Component } from 'react';

import AppBarMain from '../ui-element/AppBarMain';

import startBackup from '../../actions/backup/backup';

import '../../style/backup-restore.css';

class Backup extends Component {
  handleBackup = () => {
    startBackup();
  };
  render() {
    return (
      <div>
        <AppBarMain title={'Backup Database'} />
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
            <a
              style={{ textDecoration: 'none' }}
              href="javascript:void(0);"
              className="backup-restore-btn"
              onClick={() => console.log('I got a call')}
            >
              Restore
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Backup;
