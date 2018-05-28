import deleteAllDB from './resetDB';
import restoreDB from './restore-functions';
const loadJsonFile = window.require('load-json-file');

const startRestore = filePath => {
  // console.log(filePath);
  loadJsonFile(filePath).then(json => {
    // console.log(json);
    deleteAllDB().then(count => {
      console.log('DB Doc removed (count) => ', count);
      restoreDB(json);
    });
  });
};

export default startRestore;
