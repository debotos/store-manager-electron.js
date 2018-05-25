import db from '../../secrets/neDB';
import {
  ADD_ADVANCE,
  REMOVE_ADVANCE,
  EDIT_ADVANCE,
  SET_ADVANCES
} from '../constants';

// ADD_ADVANCE
export const addAdvance = advance => ({
  type: ADD_ADVANCE,
  advance
});

export const startAddAdvance = (advanceData = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = advanceData;
    const advance = { description, note, amount, createdAt };

    return new Promise(function(resolve, reject) {
      db.advances.insert(advance, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {
      dispatch(addAdvance({ id: newDoc._id, ...newDoc }));
    });
  };
};

// REMOVE_ADVANCE
export const removeAdvance = ({ id } = {}) => ({
  type: REMOVE_ADVANCE,
  id
});

export const startRemoveAdvance = ({ id } = {}) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.advances.remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      dispatch(removeAdvance({ id }));
    });
  };
};

// EDIT_ADVANCE
export const editAdvance = (id, updates) => ({
  type: EDIT_ADVANCE,
  id,
  updates
});

export const startEditAdvance = (id, updates) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.advances.findOne({ _id: id }, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    }).then(doc => {
      // console.log('You are trying to update this doc => ', doc);

      return new Promise(function(resolve, reject) {
        db.advances.update(doc, updates, {}, function(err, numReplaced) {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
          }
        });
      }).then(numReplaced => {
        // console.log('Advance update no => ', numReplaced);
        // console.log('Advance update with data => ', updates);
        dispatch(editAdvance(id, updates));
      });
    });
  };
};

// SET_ADVANCES
export const setAdvances = advances => ({
  type: SET_ADVANCES,
  advances
});

export const startSetAdvances = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.advances.find({}, function(err, advancesDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(advancesDoc);
        }
      });
    }).then(advancesDoc => {
      advancesDoc = advancesDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      // console.log('Got Advance Docs => ', advancesDoc);
      dispatch(setAdvances(advancesDoc));
    });
  };
};
