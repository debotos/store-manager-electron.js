import database from "../../secrets/firebase";

import {
  ADD_SELL_UNDER_CUSTOMER_HISTORY,
  SET_ADD_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_SELL_UNDER_CUSTOMER_HISTORY,
  DELETE_ALL_HISTORY_OF_THIS_NUMBER
} from "../constants";

export const deleteAllHistoryOfThisNumber = (id, number) => {
  return {
    type: DELETE_ALL_HISTORY_OF_THIS_NUMBER,
    id,
    number
  };
};

export const startDeleteAllHistoryOfThisNumber = (id, number) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/history/${id}`)
      .remove()
      .then(() => {
        console.log("Total History of this Number is Deleted from Database!");
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
    const uid = getState().auth.uid;
    let historyInDatabase = [];
    // Putting all id in an array
    dispatch(deleteSellUnderCustomerHistory(id, number));
    database
      .ref(`users/${uid}/history`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          historyInDatabase.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      })
      .then(() => {
        if (historyInDatabase.length > 0) {
          let idOfThePath;
          let position;
          let length;
          let updatedHistory = historyInDatabase.map((singleHistory, index) => {
            if (singleHistory.number.toString() === number.toString()) {
              idOfThePath = singleHistory.id;
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
            return database
              .ref(`users/${uid}/history/${idOfThePath}`)
              .remove()
              .then(() => {
                console.log(
                  "It was Last Entry. So Total History of this Number is Deleted from Database!"
                );
              });
          } else {
            return database
              .ref(`users/${uid}/history/${idOfThePath}`)
              .set(updatedHistory[position])
              .then(() => {
                console.log("History Deleted from Database!");
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let pushData = {
      number: data.number,
      history: [data.history] // Array of objects
    };
    let historyInDatabase = [];
    // Putting all id in an array
    database
      .ref(`users/${uid}/history`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          historyInDatabase.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      })
      .then(() => {
        if (historyInDatabase.length > 0) {
          // Now check if already exists
          let historyItemAlreadyExists = false;
          let historyItemIdThatAlreadyExists;
          let historyItemHistoryThatAlreadyExists;

          historyInDatabase.forEach(singleHistory => {
            if (singleHistory.number === data.number) {
              historyItemAlreadyExists = true;
              historyItemIdThatAlreadyExists = singleHistory.id;
              historyItemHistoryThatAlreadyExists = singleHistory.history;
            }
          });

          if (historyItemAlreadyExists) {
            // Overide the value that exists
            const updateData = {
              history: [data.history, ...historyItemHistoryThatAlreadyExists],
              number: data.number
            };
            return database
              .ref(`users/${uid}/history/${historyItemIdThatAlreadyExists}`)
              .update(updateData)
              .then(() => {
                const saveDataLocal = {
                  id: historyItemIdThatAlreadyExists,
                  number: data.number,
                  history: data.history
                };
                dispatch(addSellUnderCustomerHistory(saveDataLocal));
              });
          } else {
            return database
              .ref(`users/${uid}/history`)
              .push(pushData)
              .then(ref => {
                const saveDataLocal = {
                  id: ref.key,
                  number: data.number,
                  history: data.history
                };
                dispatch(addSellUnderCustomerHistory(saveDataLocal));
              });
          }
        } else {
          return database
            .ref(`users/${uid}/history`)
            .push(pushData)
            .then(ref => {
              const saveDataLocal = {
                id: ref.key,
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
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/history`)
      .once("value")
      .then(snapshot => {
        const history = {};

        snapshot.forEach(childSnapshot => {
          history[childSnapshot.val().number] = {
            history: childSnapshot.val().history,
            id: childSnapshot.key
          };
        });

        dispatch(setAddSellUnderCustomerHistory(history));
      });
  };
};
