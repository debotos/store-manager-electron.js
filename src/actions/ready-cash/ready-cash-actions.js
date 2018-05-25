import {
  ADD_AN_ENTRY_TO_READY_CASH,
  SET_READY_CASH,
  RESET_READY_CASH,
  REMOVE_AN_ENTRY_FROM_READY_CASH
} from '../constants';
import db from '../../secrets/neDB';

export const removeAnEntryToReadyCash = (id, type_of) => {
  return {
    type: REMOVE_AN_ENTRY_FROM_READY_CASH,
    id,
    type_of
  };
};

export const startRemoveAnEntryToReadyCash = (id, type) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.readyCash[type].remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      dispatch(removeAnEntryToReadyCash(id, type));
    });
  };
};

export const addAnEntryToReadyCash = data => {
  return {
    type: ADD_AN_ENTRY_TO_READY_CASH,
    data
  };
};

export const startAddAnEntryToReadyCash = data => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.readyCash[data.type].insert(data, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {
      dispatch(addAnEntryToReadyCash({ id: newDoc._id, ...newDoc }));
    });
  };
};

export const resetReadyCash = () => ({ type: RESET_READY_CASH });

export const startResetReadyCash = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.readyCash['income'].remove({}, { multi: true }, function(
        err,
        numRemoved
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      // console.log('Ready Cash Income Doc removed Items => ', numRemoved);
      return new Promise(function(resolve, reject) {
        db.readyCash['expenses'].remove({}, { multi: true }, function(
          err,
          numRemoved
        ) {
          if (err) {
            reject(err);
          } else {
            resolve(numRemoved);
          }
        });
      }).then(numRemoved => {
        // console.log('Ready Cash Expenses Doc removed Items => ', numRemoved);
        dispatch(resetReadyCash());
      });
    });
  };
};

export const setReadyCash = data => ({
  type: SET_READY_CASH,
  data
});

export const startSetReadyCash = () => {
  return (dispatch, getState) => {
    const readyCash = {};
    return new Promise(function(resolve, reject) {
      db.readyCash['income'].find({}, function(err, income) {
        if (err) {
          reject(err);
        } else {
          resolve(income);
        }
      });
    }).then(income => {
      income = income.map(singleItem => {
        return (singleItem = { id: singleItem._id, ...singleItem });
      });
      // console.log('Got ready cash income => ', income);
      readyCash['income'] = income;
      return new Promise(function(resolve, reject) {
        db.readyCash['expenses'].find({}, function(err, expenses) {
          if (err) {
            reject(err);
          } else {
            resolve(expenses);
          }
        });
      }).then(expenses => {
        expenses = expenses.map(singleItem => {
          return (singleItem = { id: singleItem._id, ...singleItem });
        });
        // console.log('Got ready cash expenses => ', expenses);
        readyCash['expenses'] = expenses;
        dispatch(setReadyCash(readyCash));
      });
    });
  };
};
