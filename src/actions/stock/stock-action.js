import {
  SET_STOCK,
  REMOVE_ITEM_FROM_STOCK,
  ADD_ITEM_TO_STOCK,
  UPDATE_STOCK_ITEM
} from '../constants';
import db from '../../secrets/neDB';

// CURD Actions of Database is here

// This func Expecting an object
// Create
export const addItemToStock = data => ({
  type: ADD_ITEM_TO_STOCK,
  data
});

export const startAddItemToStock = data => {
  let doc = { ...data };
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.stock[data.productCategoryToSell].insert(doc, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {
      dispatch(addItemToStock({ id: newDoc._id, ...newDoc }));
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
    return new Promise(function(resolve, reject) {
      db.stock[productCategoryToSell].remove({ _id: id }, {}, function(
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
      dispatch(removeItemToStock(productCategoryToSell, id));
    });
  };
};

// const removeId = obj => {
//   console.log('Incomming Stock Object => ', obj);
//   let newObj = {
//     productCode: obj['productCode'],
//     productName: obj['productName']
//   };
//   console.log('Return back Stock Object for Query => ', newObj);
//   return newObj;
// };
// Update
export const updateStockItem = (id, data) => ({
  type: UPDATE_STOCK_ITEM,
  id,
  data
});

export const startUpdateStockItem = (id, data) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      db.stock[data.productCategoryToSell].findOne({ _id: id }, function(
        err,
        doc
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    }).then(doc => {
      console.log('You are trying to update this doc => ', doc);

      return new Promise(function(resolve, reject) {
        db.stock[data.productCategoryToSell].update(doc, data, {}, function(
          err,
          numReplaced
        ) {
          if (err) {
            reject(err);
          } else {
            resolve(numReplaced);
          }
        });
      }).then(numReplaced => {
        console.log('Stock update no => ', numReplaced);
        console.log('Stock update with data => ', data);
        dispatch(updateStockItem(id, data));
      });
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
  console.log('startSetStock() got called!');
  return (dispatch, getState) => {
    const stockData = {
      aluminium: [],
      glass: [],
      ss: [],
      others: []
    };
    return new Promise(function(resolve, reject) {
      db.stock['aluminium'].find({}, function(err, aluminiumDocs) {
        if (err) {
          reject(err);
        } else {
          resolve(aluminiumDocs);
        }
      });
    }).then(aluminiumDocs => {
      console.log('Got aluminium in stock => ', aluminiumDocs);
      stockData.aluminium = aluminiumDocs.map(singleItem => {
        return (singleItem = { id: singleItem._id, ...singleItem });
      }); // Aluminium Doc Set

      return new Promise(function(resolve, reject) {
        db.stock['glass'].find({}, function(err, glassDocs) {
          if (err) {
            reject(err);
          } else {
            resolve(glassDocs);
          }
        });
      }).then(glassDocs => {
        console.log('Got glass in stock => ', glassDocs);
        stockData.glass = glassDocs.map(singleItem => {
          return (singleItem = { id: singleItem._id, ...singleItem });
        }); // Glass Doc Set

        return new Promise(function(resolve, reject) {
          db.stock['ss'].find({}, function(err, ssDocs) {
            if (err) {
              reject(err);
            } else {
              resolve(ssDocs);
            }
          });
        }).then(ssDocs => {
          console.log('Got ss in stock => ', ssDocs);
          stockData.ss = ssDocs.map(singleItem => {
            return (singleItem = { id: singleItem._id, ...singleItem });
          }); // SS Doc Set

          return new Promise(function(resolve, reject) {
            db.stock['others'].find({}, function(err, othersDocs) {
              if (err) {
                reject(err);
              } else {
                resolve(othersDocs);
              }
            });
          }).then(othersDocs => {
            console.log('Got others in stock => ', othersDocs);
            stockData.others = othersDocs.map(singleItem => {
              return (singleItem = { id: singleItem._id, ...singleItem });
            }); // Others Doc Set
            console.log('Setting up stock with => ', stockData);
            dispatch(setStock(stockData));
          });
        });
      });
    });
  };
};
