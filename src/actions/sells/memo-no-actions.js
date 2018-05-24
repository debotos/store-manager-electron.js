import db from '../../secrets/neDB';
import { INCREMENT_MEMO_NUMBER, START_SET_MEMO_NUMBER } from '../constants';

export const incrementMemoNumber = (id, memoNumber) => {
  return {
    type: INCREMENT_MEMO_NUMBER,
    data: {
      id,
      memoNumber
    }
  };
};

export const startIncrementMemoNumber = () => {
  let memoDoc;
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['memo'].find({}, function(err, memoDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(memoDoc);
        }
      });
    }).then(memoDoc => {
      let data;
      if (memoDoc.length > 0) {
        memoDoc = memoDoc[0];
        let value = parseInt(memoDoc.memoNumber, 10) + 1;
        data = {
          memoNumber: value
        };
        // Update Doc
        return new Promise(function(resolve, reject) {
          db['memo'].update(memoDoc[0], data, {}, function(err, numReplaced) {
            if (err) {
              reject(err);
            } else {
              resolve(numReplaced);
            }
          });
        }).then(numReplaced => {
          console.log('memo Update no => ', numReplaced);
          console.log('memo Updated with data => ', data);
          dispatch(incrementMemoNumber(memoDoc._id, data.memoNumber));
        });
      } else {
        // Insert Doc
        data = {
          memoNumber: 2
        };
        return new Promise(function(resolve, reject) {
          db['memo'].insert(data, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          dispatch(incrementMemoNumber(newDoc._id, newDoc.memoNumber));
        });
      }
    });
  };
};

export const setMemoNumber = data => ({
  type: START_SET_MEMO_NUMBER,
  data
});

export const startSetMemoNumber = () => {
  let memoNoDoc = { id: '', memoNumber: 1 };
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['memo'].find({}, function(err, memoDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(memoDoc);
        }
      });
    }).then(memoDoc => {
      memoDoc = memoDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      console.log('Got memoDoc => ', memoDoc);
      if (memoDoc.length > 0) {
        memoNoDoc = { ...memoDoc[0] };
      }
      console.log('Setting up memo with =>', memoDoc);
      dispatch(setMemoNumber(memoNoDoc));
    });
  };
};
