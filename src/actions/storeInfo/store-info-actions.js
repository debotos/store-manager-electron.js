import db from '../../secrets/neDB';
import { UPDATE_STORE_INFO, SET_STORE_INFO } from '../constants';
import { reject } from 'bluebird-lst';

const updateStoreInfo = data => {
  return {
    type: UPDATE_STORE_INFO,
    info: {
      ...data
    }
  };
};

export const startUpdateStoreInfo = storeInfo => {
  // console.log("startUpdateStoreInfo got a call");
  return (dispatch, getState) => {
    var doc = { ...storeInfo };
    var docWithID = {};

    return new Promise(function(resolve, reject) {
      db['info'].count({}, function(err, count) {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    }).then(count => {
      // console.log('Got the Doc Amount => ', count);
      if (count === 0) {
        return new Promise(function(resolve, reject) {
          db['info'].insert(doc, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              // console.log('Info Added!');
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          docWithID = { ...newDoc };
          dispatch(updateStoreInfo(docWithID));
        });
      } else {
        return new Promise(function(resolve, reject) {
          db['info'].remove({}, { multi: true }, function(err, numRemoved) {
            if (err) {
              reject(err);
            } else {
              // console.log('Info Deleted!');
              resolve(numRemoved);
            }
          });
        }).then(numRemoved => {
          // console.log('Existing Info Deleted. Update is processing...');
          return new Promise(function(resolve, reject) {
            db['info'].insert(doc, function(err, newDoc) {
              if (err) {
                reject(err);
              } else {
                console.log('Info Updated!');
                resolve(newDoc);
              }
            });
          }).then(newDoc => {
            docWithID = { ...newDoc };
            dispatch(updateStoreInfo(docWithID));
          });
        });
      }
    });
  };
};

export const setStoreInfo = data => {
  // console.log(data);
  return {
    type: SET_STORE_INFO,
    data
  };
};

export const startSetStoreInfo = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['info'].find({}, function(err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    }).then(docs => {
      if (docs.length === 0) {
        docs[0] = {
          name: 'Set Your Store NAME',
          number1: 70000000000,
          number2: 90000000000,
          number3: 80000000000,
          address: 'Set Your Store ADDRESS',
          password: 12345
        };
      }
      dispatch(setStoreInfo(docs[0]));
    });
  };
};
