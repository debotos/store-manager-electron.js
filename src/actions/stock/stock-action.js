import {
  SET_STOCK,
  REMOVE_ITEM_FROM_STOCK,
  ADD_ITEM_TO_STOCK,
  UPDATE_STOCK_ITEM
} from "../constants";
import database from "../../secrets/firebase";

// CURD Actions of Database is here

// This func Expecting an object
// Create
export const addItemToStock = data => ({
  type: ADD_ITEM_TO_STOCK,
  data
});

export const startAddItemToStock = data => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/stock/${data.productCategoryToSell}`)
      .push(data)
      .then(ref => {
        dispatch(addItemToStock({ id: ref.key, ...data }));
      });
  };
};

// Expection just an id and category
// Delete
export const removeItemToStock = (productCategoryToSell, id) => ({
  type: REMOVE_ITEM_FROM_STOCK,
  productCategoryToSell,
  id
});

export const startRemoveItemToStock = (productCategoryToSell, id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/stock/${productCategoryToSell}/${id}`)
      .remove()
      .then(() => {
        dispatch(removeItemToStock(productCategoryToSell, id));
      });
  };
};

// Update
export const updateStockItem = (id, data) => ({
  type: UPDATE_STOCK_ITEM,
  id,
  data
});

export const startUpdateStockItem = (id, data) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/stock/${data.productCategoryToSell}/${id}`)
      .update(data)
      .then(() => {
        dispatch(updateStockItem(id, { id, ...data }));
      });
  };
};

// Function to get data from firebase and fill the local store
// Read
export const setStock = data => ({
  type: SET_STOCK,
  data
});

export const startSetStock = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/stock`)
      .once("value")
      .then(snapshot => {
        const stock = {
          aluminium: [],
          glass: [],
          ss: [],
          others: []
        };
        snapshot.forEach(childSnapshot => {
          let values = [];
          childSnapshot.forEach(singleSnapshot => {
            let key = singleSnapshot.key;
            values.push({ id: key, ...singleSnapshot.val() });
          });
          stock[childSnapshot.key] = values;
        });
        console.log(stock);
        dispatch(setStock(stock));
      });
  };
};
