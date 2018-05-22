import {
  ADD_AN_ENTRY_TO_READY_CASH,
  SET_READY_CASH,
  RESET_READY_CASH,
  REMOVE_AN_ENTRY_FROM_READY_CASH
} from "../constants";
import database from "../../secrets/firebase";

export const removeAnEntryToReadyCash = (id, type_of) => {
  return {
    type: REMOVE_AN_ENTRY_FROM_READY_CASH,
    id,
    type_of
  };
};

export const startRemoveAnEntryToReadyCash = (id, type) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (type === "income") {
      return database
        .ref(`users/${uid}/ready-cash/income/${id}`)
        .remove()
        .then(ref => {
          dispatch(removeAnEntryToReadyCash(id, type));
        });
    } else {
      return database
        .ref(`users/${uid}/ready-cash/expenses/${id}`)
        .remove()
        .then(ref => {
          dispatch(removeAnEntryToReadyCash(id, type));
        });
    }
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
    const uid = getState().auth.uid;
    if (data.type === "income") {
      return database
        .ref(`users/${uid}/ready-cash/income`)
        .push(data)
        .then(ref => {
          dispatch(addAnEntryToReadyCash({ id: ref.key, ...data }));
        });
    } else {
      return database
        .ref(`users/${uid}/ready-cash/expenses`)
        .push(data)
        .then(ref => {
          dispatch(addAnEntryToReadyCash({ id: ref.key, ...data }));
        });
    }
  };
};

export const resetReadyCash = () => ({ type: RESET_READY_CASH });

export const startResetReadyCash = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/ready-cash`)
      .remove()
      .then(() => {
        dispatch(resetReadyCash());
      });
  };
};

export const setReadyCash = data => ({
  type: SET_READY_CASH,
  data
});

export const startSetReadyCash = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/ready-cash`)
      .once("value")
      .then(snapshot => {
        const readyCash = {};
        snapshot.forEach(childSnapshot => {
          let values = [];
          childSnapshot.forEach(singleSnapshot => {
            let key = singleSnapshot.key;
            values.push({ id: key, ...singleSnapshot.val() });
          });
          readyCash[childSnapshot.key] = values;
        });
        console.log(readyCash);
        dispatch(setReadyCash(readyCash));
      });
  };
};
