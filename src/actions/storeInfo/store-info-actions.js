import database from "../../secrets/firebase";
import { UPDATE_STORE_INFO, SET_STORE_INFO } from "../constants";

const updateStoreInfo = (id, data) => {
  return {
    type: UPDATE_STORE_INFO,
    info: {
      id,
      ...data
    }
  };
};

export const startUpdateStoreInfo = storeInfo => {
  // console.log("startUpdateStoreInfo got a call");
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // let currentValue;
    let currentValueId;
    let allValue = [];
    database
      .ref(`users/${uid}/store-info`)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // currentValue = childSnapshot.val().info;
          // console.log("current INFO. ", currentValue);
          currentValueId = childSnapshot.key;
          // console.log("current info ID ", currentValueId);
          allValue.push(childSnapshot.val().info);
        });
      })
      .then(() => {
        let data;
        if (allValue.length > 0) {
          data = {
            info: storeInfo
          };
          return database
            .ref(`users/${uid}/store-info/${currentValueId}`)
            .update(data)
            .then(() => {
              dispatch(updateStoreInfo(currentValueId, storeInfo));
            });
        } else {
          console.log("Calling Push for StoreInfo");
          data = {
            info: storeInfo
          };
          return database
            .ref(`users/${uid}/store-info`)
            .push(data)
            .then(ref => {
              dispatch(updateStoreInfo(ref.key, storeInfo));
            });
        }
      });
  };
};

export const setStoreInfo = data => ({
  type: SET_STORE_INFO,
  data
});

export const startSetStoreInfo = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/store-info`)
      .once("value")
      .then(snapshot => {
        let storeInfo = {
          id: "",
          name: "",
          number1: "",
          number2: "",
          number3: "",
          address: "",
          password: ""
        };

        snapshot.forEach(childSnapshot => {
          storeInfo = {
            id: childSnapshot.key,
            ...childSnapshot.val().info
          };
        });

        dispatch(setStoreInfo(storeInfo));
      });
  };
};
