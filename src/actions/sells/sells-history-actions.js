import db from '../../secrets/neDB';
import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY,
  SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_ALL_HISTORY_OF_THIS_NUMBER
} from '../constants';

export const deleteAllHistoryOfThisNumber = (id, number) => {
  return {
    type: DELETE_ALL_HISTORY_OF_THIS_NUMBER,
    id,
    number
  };
};

export const startDeleteAllHistoryOfThisNumber = (id, number) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['sellsHistory'].remove({ _id: id }, {}, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      // console.log(
      //   'Total History of this Number is Deleted from Database!',
      //   number
      // );
      dispatch(deleteAllHistoryOfThisNumber(id, number));
    });
  };
};

export const deleteSellUnderCustomerHistory = (id, number) => {
  return {
    type: DELETE_SELL_UNDER_CUSTOMER_HISTORY,
    id,
    number
  };
};

export const startDeleteSellUnderCustomerHistory = (id, number) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['sellsHistory'].find({}, function(err, historyInDatabase) {
        if (err) {
          reject(err);
        } else {
          resolve(historyInDatabase);
        }
      });
    }).then(historyInDatabase => {
      if (historyInDatabase.length > 0) {
        let idOfThePath;
        let position;
        let length;
        let updatedHistory = historyInDatabase.map((singleHistory, index) => {
          if (singleHistory.number.toString() === number.toString()) {
            idOfThePath = singleHistory._id;
            position = index;
            length = singleHistory.history.length;
            return {
              number: singleHistory.number,
              history: singleHistory.history.filter(
                singleItem => singleItem.id !== id
              )
            };
          } else {
            return {
              number: singleHistory.number,
              history: singleHistory.history
            };
          }
        });

        if (length === 1) {
          return new Promise(function(resolve, reject) {
            db['sellsHistory'].remove({ _id: idOfThePath }, {}, function(
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
            // console.log(
            //   'It was Last Entry. So Total History of this Number is Deleted from Database!'
            // );
            dispatch(deleteSellUnderCustomerHistory(id, number));
          });
        } else {
          return new Promise(function(resolve, reject) {
            db['sellsHistory'].update(
              { _id: idOfThePath },
              updatedHistory[position],
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
            // console.log('History Deleted from Database!');
            dispatch(deleteSellUnderCustomerHistory(id, number));
          });
        }
      }
    });
  };
};

export const addSellUnderCustomerHistory = data => {
  return {
    type: ADD_SELL_UNDER_CUSTOMER_HISTORY,
    data
  };
};

export const startAddSellUnderCustomerHistory = data => {
  // console.log('------------------------------------');
  // console.log(
  //   'startAddSellUnderCustomerHistory() got called! with data => ',
  //   data
  // );
  // console.log('------------------------------------');
  return (dispatch, getState) => {
    let pushData = {
      number: data.number,
      history: [data.history] // Array of objects
    };
    return new Promise(function(resolve, reject) {
      db['sellsHistory'].find({}, function(err, historyInDatabase) {
        if (err) {
          reject(err);
        } else {
          resolve(historyInDatabase);
        }
      });
    }).then(historyInDatabase => {
      // console.log('------------------------------------');
      // console.log('All history of sells => ', historyInDatabase);
      // console.log('------------------------------------');
      if (historyInDatabase.length > 0) {
        // Now check if already exists
        let historyItemAlreadyExists = false;
        let historyItemIdThatAlreadyExists;
        let historyItemHistoryThatAlreadyExists;

        historyInDatabase.forEach(singleHistory => {
          if (singleHistory.number === data.number) {
            // console.log('------------------------------------');
            // console.log('Number exists in sells. ');
            // console.log('------------------------------------');
            historyItemAlreadyExists = true;
            historyItemIdThatAlreadyExists = singleHistory._id;
            historyItemHistoryThatAlreadyExists = singleHistory.history;
          }
        });
        if (historyItemAlreadyExists) {
          // Overide the value that exists
          const updateData = {
            history: [data.history, ...historyItemHistoryThatAlreadyExists],
            number: data.number
          };
          return new Promise(function(resolve, reject) {
            db['sellsHistory'].update(
              { _id: historyItemIdThatAlreadyExists },
              updateData,
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
            const saveDataLocal = {
              id: historyItemIdThatAlreadyExists,
              number: data.number,
              history: data.history
            };
            dispatch(addSellUnderCustomerHistory(saveDataLocal));
          });
        } else {
          return new Promise(function(resolve, reject) {
            db['sellsHistory'].insert(pushData, function(err, newDoc) {
              if (err) {
                reject(err);
              } else {
                resolve(newDoc);
              }
            });
          }).then(newDoc => {
            const saveDataLocal = {
              id: newDoc._id,
              number: data.number,
              history: data.history
            };
            dispatch(addSellUnderCustomerHistory(saveDataLocal));
          });
        }
      } else {
        return new Promise(function(resolve, reject) {
          db['sellsHistory'].insert(pushData, function(err, newDoc) {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        }).then(newDoc => {
          const saveDataLocal = {
            id: newDoc._id,
            number: data.number,
            history: data.history
          };
          dispatch(addSellUnderCustomerHistory(saveDataLocal));
        });
      }
    });
  };
};

export const setAddSellUnderCustomerHistory = data => ({
  type: SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
  data
});

export const startSetAddSellUnderCustomerHistory = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db['sellsHistory'].find({}, function(err, historyInDatabase) {
        if (err) {
          reject(err);
        } else {
          resolve(historyInDatabase);
        }
      });
    }).then(historyInDatabase => {
      const history = {};
      historyInDatabase.forEach(singleHistoryItem => {
        history[singleHistoryItem.number] = {
          history: singleHistoryItem.history,
          id: singleHistoryItem._id
        };
      });

      dispatch(setAddSellUnderCustomerHistory(history));
    });
  };
};
