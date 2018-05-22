import database from "../../secrets/firebase";
import { INCREMENT_MEMO_NUMBER, START_SET_MEMO_NUMBER } from "../constants";

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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    let currentValue;
    let currentValueId;
    let allValue = [];
    database
      .ref(`users/${uid}/memo`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          currentValue = childSnapshot.val().memoNumber;
          console.log("current memo NO. ", currentValue);
          currentValueId = childSnapshot.key;
          console.log("current memo ID ", currentValueId);
          allValue.push(childSnapshot.val());
        });
      })
      .then(() => {
        let data;
        if (allValue.length > 0) {
          let value = parseInt(currentValue, 10) + 1;
          data = {
            memoNumber: value
          };
          return database
            .ref(`users/${uid}/memo/${currentValueId}`)
            .update(data)
            .then(() => {
              dispatch(incrementMemoNumber(currentValueId, value));
            });
        } else {
          data = {
            memoNumber: 2
          };
          return database
            .ref(`users/${uid}/memo`)
            .push(data)
            .then(ref => {
              dispatch(incrementMemoNumber(ref.key, data.memoNumber));
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/memo`)
      .once("value")
      .then(snapshot => {
        let memo = { id: "", memoNumber: 1 };

        snapshot.forEach(childSnapshot => {
          memo = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
        });

        dispatch(setMemoNumber(memo));
      });
  };
};
