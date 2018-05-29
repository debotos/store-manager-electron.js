import deleteAllDB from './resetDB';
import restoreDB from './restore-functions';
const loadJsonFile = window.require('load-json-file');

const startRestore = filePath => {
  // console.log(filePath);
  return loadJsonFile(filePath).then(json => {
    // console.log(json);
    return deleteAllDB().then(count => {
      console.log('DB Doc removed (count) => ', count);
      return restoreDB(json).then(docInserted => {
        console.log('DB Restored with => ', docInserted);
        return docInserted;
      });
    });
  });
};

export default startRestore;
