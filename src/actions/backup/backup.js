import collectAll from './backup-functions';

const writeJsonFile = window.require('write-json-file');
const app = window.require('electron').remote.app;

var desktopPath = app.getPath('desktop');
let file_name = `/${Date().substr(0, 15)}_Database_Backup.json`;
console.log('++++++++++++++++++++++++++++++++');
console.log(desktopPath + file_name);
console.log('++++++++++++++++++++++++++++++++');

const startBackup = () => {
  return collectAll().then(data => {
    console.log(data);
    return writeJsonFile.sync(desktopPath + file_name, data);
  });
};

export default startBackup;
