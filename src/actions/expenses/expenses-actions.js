import db from '../../secrets/neDB';
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SET_EXPENSES
} from '../constants';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: ADD_EXPENSE,
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return new Promise(function(resolve, reject) {
      db.expenses.insert(expense, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {
      dispatch(addExpense({ id: newDoc._id, ...newDoc }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: REMOVE_EXPENSE,
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.expenses.remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.expenses.findOne({ _id: id }, function(err, doc) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    }).then(doc => {
      console.log('You are trying to update this doc => ', doc);

      return new Promise(function(resolve, reject) {
        db.expenses.update(doc, updates, {}, function(err, numReplaced) {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
          }
        });
      }).then(numReplaced => {
        console.log('Expense update no => ', numReplaced);
        console.log('Expense update with data => ', updates);
        dispatch(editExpense(id, updates));
      });
    });
  };
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: SET_EXPENSES,
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.expenses.find({}, function(err, expensesDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(expensesDoc);
        }
      });
    }).then(expensesDoc => {
      expensesDoc = expensesDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      console.log('Got Expense Docs => ', expensesDoc);
      dispatch(setExpenses(expensesDoc));
    });
  };
};
