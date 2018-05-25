import db from '../../secrets/neDB';
import {
  ADD_INCOME,
  REMOVE_INCOME,
  EDIT_INCOME,
  SET_INCOMES
} from '../constants';

// ADD_INCOME
export const addIncome = income => ({
  type: ADD_INCOME,
  income
});

export const startAddIncome = (incomeData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = incomeData;
    const income = { description, note, amount, createdAt };

    return new Promise(function(resolve, reject) {
      db.incomes.insert(income, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {
      dispatch(addIncome({ id: newDoc._id, ...newDoc }));
    });
  };
};

// REMOVE_INCOME
export const removeIncome = ({ id } = {}) => ({
  type: REMOVE_INCOME,
  id
});

export const startRemoveIncome = ({ id } = {}) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.incomes.remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      dispatch(removeIncome({ id }));
    });
  };
};

// EDIT_INCOME
export const editIncome = (id, updates) => ({
  type: EDIT_INCOME,
  id,
  updates
});

export const startEditIncome = (id, updates) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.incomes.findOne({ _id: id }, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    }).then(doc => {
      // console.log('You are trying to update this doc => ', doc);

      return new Promise(function(resolve, reject) {
        db.incomes.update(doc, updates, {}, function(err, numReplaced) {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
          }
        });
      }).then(numReplaced => {
        // console.log('Income update no => ', numReplaced);
        // console.log('Income update with data => ', updates);
        dispatch(editIncome(id, updates));
      });
    });
  };
};

// SET_INCOMES
export const setIncomes = incomes => ({
  type: SET_INCOMES,
  incomes
});

export const startSetIncomes = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.incomes.find({}, function(err, incomesDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(incomesDoc);
        }
      });
    }).then(incomesDoc => {
      incomesDoc = incomesDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      // console.log('Got Income Docs => ', incomesDoc);
      dispatch(setIncomes(incomesDoc));
    });
  };
};
