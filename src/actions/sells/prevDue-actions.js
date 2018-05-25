import db from '../../secrets/neDB';
import {
  ADD_A_PREV_DUE,
  SET_DUE,
  UPDATE_A_PREV_DUE,
  REMOVE_A_PREV_DUE
} from '../constants';

export const addPrevDue = (id, number, amount, info) => {
  return {
    type: ADD_A_PREV_DUE,
    data: {
      id,
      number,
      amount,
      info
    }
  };
};

// Server Side Code for adding a due [neDB :)]
export const startAddPrevDue = (number, amount, info, id = '') => {
  return (dispatch, getState) => {
    const due = { number, amount, info };
    return new Promise(function(resolve, reject) {
      db['due'].find({}, function(err, dueDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(dueDoc);
        }
      });
    }).then(dueDoc => {
      if (dueDoc.length > 0) {
        let dueItemAlreadyExists = false;
        let dueItemIdThatAlreadyExists;
        dueDoc.forEach(singleDue => {
          if (singleDue.number === number) {
            // console.log('Number already have Due and id is => ', singleDue._id);
            dueItemAlreadyExists = true;
            dueItemIdThatAlreadyExists = singleDue._id;
          }
        });
        if (dueItemAlreadyExists) {
          return new Promise(function(resolve, reject) {
            db['due'].update(
              { _id: dueItemIdThatAlreadyExists },
              due,
              {},
              function(err, numReplaced) {
                if (err) {
                  reject(err);
                } else {
                  // console.log('Due Updated with doc => ', due);
                  resolve(numReplaced);
                }
              }
            );
          }).then(numReplaced => {
            // console.log('Number already exists in Due, so Due Updated!');
            dispatch(
              addPrevDue(dueItemIdThatAlreadyExists, number, amount, info)
            );
          });
        } else {
          return new Promise(function(resolve, reject) {
            db['due'].insert(due, function(err, newDoc) {
              if (err) {
                reject(err);
              } else {
                resolve(newDoc);
              }
            });
          }).then(newDoc => {
            // console.log('Number is New in Due, so Due Added!');
            dispatch(addPrevDue((id = newDoc._id), number, amount, info));
          });
        }
      } else {
        return new Promise(function(resolve, reject) {
          db['due'].insert(due, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          // console.log('Number is New in Due, so Due Added!');
          dispatch(addPrevDue((id = newDoc._id), number, amount, info));
        });
      }
    });
  };
};

// Update Due
const updatePrevDue = (id, number, amount, info) => {
  return {
    type: UPDATE_A_PREV_DUE,
    id,
    amount,
    number,
    data: {
      id,
      amount,
      number,
      info
    }
  };
};

export const startUpdatePrevDue = (id, number, amount, info) => {
  const dueUpdates = {
    number,
    amount,
    info
  };
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['due'].update({ _id: id }, dueUpdates, {}, function(err, numReplaced) {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      });
    }).then(numReplaced => {
      // console.log('Due Updated!');
      dispatch(updatePrevDue(id, number, amount, info));
    });
  };
};

// Delete a Due completly
const removePrevDue = id => {
  return {
    type: REMOVE_A_PREV_DUE,
    id
  };
};

export const startRemovePrevDue = id => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['due'].remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      // console.log('Due Removed!');
      dispatch(removePrevDue(id));
    });
  };
};

export const setDue = data => ({
  type: SET_DUE,
  data
});

export const startSetExistingDueFromServer = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['due'].find({}, function(err, dueDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(dueDoc);
        }
      });
    }).then(dueDoc => {
      dueDoc = dueDoc.map(
        singleItem => (singleItem = { id: singleItem._id, ...singleItem })
      );
      // console.log('Setting up Due with => ', dueDoc);
      dispatch(setDue(dueDoc));
    });
  };
};
