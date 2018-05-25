import db from '../../secrets/neDB';
import {
  UPDATE_READY_CASH_AMOUNT,
  SET_READY_CASH_AMOUNT,
  OVERRIDE_READY_CASH_AMOUNT
} from '../constants';

export const overrideReadyCash = (id, amount) => {
  return {
    type: OVERRIDE_READY_CASH_AMOUNT,
    data: {
      id,
      amount
    }
  };
};

export const startOverrideReadyCash = amount => {
  let readyCashDoc;
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['readyCashAmount'].find({}, function(err, readyCashAmountDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(readyCashAmountDoc);
        }
      });
    }).then(readyCashAmountDoc => {
      let data = {
        amount: parseFloat(amount).toFixed(2)
      };
      if (readyCashAmountDoc.length === 0) {
        // Insert Doc
        return new Promise(function(resolve, reject) {
          db['readyCashAmount'].insert(data, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          dispatch(overrideReadyCash(newDoc._id, newDoc.amount));
        });
      } else {
        // Update Doc
        readyCashDoc = readyCashAmountDoc[0];
        return new Promise(function(resolve, reject) {
          db['readyCashAmount'].update(
            readyCashAmountDoc[0],
            data,
            {},
            function(err, numReplaced) {
              if (err) {
                reject(err);
              } else {
                resolve(numReplaced);
              }
            }
          );
        }).then(numReplaced => {
          // console.log('ReadyCashAmount OverrideUpdate no => ', numReplaced);
          // console.log('ReadyCashAmount OverrideUpdated with data => ', data);
          dispatch(overrideReadyCash(readyCashDoc._id, data.amount));
        });
      }
    });
  };
};

export const updateReadyCash = (id, amount) => {
  return {
    type: UPDATE_READY_CASH_AMOUNT,
    data: {
      id,
      amount
    }
  };
};

export const startUpdateReadyCash = amount => {
  let readyCashDoc;
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['readyCashAmount'].find({}, function(err, readyCashAmountDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(readyCashAmountDoc);
        }
      });
    }).then(readyCashAmountDoc => {
      let data;
      if (readyCashAmountDoc.length === 0) {
        // Insert Doc
        data = {
          amount: parseFloat(amount).toFixed(2)
        };
        return new Promise(function(resolve, reject) {
          db['readyCashAmount'].insert(data, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          dispatch(updateReadyCash(newDoc._id, newDoc.amount));
        });
      } else {
        // Update Doc
        readyCashDoc = readyCashAmountDoc[0];
        let value = (
          parseFloat(readyCashDoc.amount) + parseFloat(amount)
        ).toFixed(2);
        data = {
          amount: value
        };
        return new Promise(function(resolve, reject) {
          db['readyCashAmount'].update(
            readyCashAmountDoc[0],
            data,
            {},
            function(err, numReplaced) {
              if (err) {
                reject(err);
              } else {
                resolve(numReplaced);
              }
            }
          );
        }).then(numReplaced => {
          // console.log('ReadyCashAmount Update no => ', numReplaced);
          // console.log('ReadyCashAmount Updated with data => ', data);
          dispatch(updateReadyCash(readyCashDoc._id, data.amount));
        });
      }
    });
  };
};

export const setReadyCashAmount = data => ({
  type: SET_READY_CASH_AMOUNT,
  data
});

export const startSetReadyCashAmount = () => {
  let readyCashAmoumt = { id: '', amount: 0 };
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['readyCashAmount'].find({}, function(err, readyCashAmountDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(readyCashAmountDoc);
        }
      });
    }).then(readyCashAmountDoc => {
      readyCashAmountDoc = readyCashAmountDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      // console.log('Got readyCashAmountDoc => ', readyCashAmountDoc);
      if (readyCashAmountDoc.length > 0) {
        readyCashAmoumt = { ...readyCashAmountDoc[0] };
      }
      // console.log('Setting up ReadyCashAmount with =>', readyCashAmoumt);
      dispatch(setReadyCashAmount(readyCashAmoumt));
    });
  };
};
