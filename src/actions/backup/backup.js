import collectAll from './backup-functions';

const startBackup = () => {
  collectAll().then(data => {
    console.log(data);
  });
};

export default startBackup;
