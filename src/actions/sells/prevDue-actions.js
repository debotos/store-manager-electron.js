import database from "../../secrets/firebase";
import {
  ADD_A_PREV_DUE,
  SET_DUE,
  UPDATE_A_PREV_DUE,
  REMOVE_A_PREV_DUE
} from "../constants";

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

// Server Side Code for adding a due [Firebase :)]
export const startAddPrevDue = (number, amount, info, id = "") => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const due = { number, amount, info };
    let dueInDatabase = [];
    // Putting all id in an array
    database
      .ref(`users/${uid}/due`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          dueInDatabase.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      })
      .then(() => {
        // checking if any due exists
        if (dueInDatabase.length > 0) {
          // checking due that i want... already exists that account
          let dueItemAlreadyExists = false;
          let dueItemIdThatAlreadyExists;
          dueInDatabase.forEach(singleDue => {
            if (singleDue.number === number) {
              dueItemAlreadyExists = true;
              dueItemIdThatAlreadyExists = singleDue.id;
            }
          });
          // Now i know that already have or not, so...go for it
          if (dueItemAlreadyExists) {
            // Overide the value that exists
            return database
              .ref(`users/${uid}/due/${dueItemIdThatAlreadyExists}`)
              .update(due)
              .then(() => {
                dispatch(
                  addPrevDue(
                    (id = dueItemIdThatAlreadyExists),
                    number,
                    amount,
                    info
                  )
                );
              });
          } else {
            return database
              .ref(`users/${uid}/due`)
              .push(due)
              .then(ref => {
                dispatch(addPrevDue((id = ref.key), number, amount, info));
              });
          }
        } else {
          return database
            .ref(`users/${uid}/due`)
            .push(due)
            .then(ref => {
              dispatch(addPrevDue((id = ref.key), number, amount, info));
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const dueUpdates = {
      number,
      amount,
      info
    };
    return database
      .ref(`users/${uid}/due/${id}`)
      .update(dueUpdates)
      .then(() => {
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
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/due/${id}`)
      .remove()
      .then(() => {
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
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/due`)
      .once("value")
      .then(snapshot => {
        const due = [];

        snapshot.forEach(childSnapshot => {
          due.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setDue(due));
      });
  };
};
