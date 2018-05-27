import db from '../../secrets/neDB';

const DATABASE = {};

function collectAdvance() {
  return new Promise(function(resolve, reject) {
    db.advances.find({}, function(err, advancesDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(advancesDoc);
      }
    });
  }).then(advancesDoc => {
    // console.log('Got Advance Doc => ', advancesDoc);
    DATABASE['advances'] = advancesDoc;
    return advancesDoc;
  });
}

function collectExpense() {
  return new Promise(function(resolve, reject) {
    db.expenses.find({}, function(err, expensesDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(expensesDoc);
      }
    });
  }).then(expensesDoc => {
    // console.log('Got Expense Doc =>', expensesDoc);
    DATABASE['expenses'] = expensesDoc;
    return expensesDoc;
  });
}

function collectIncome() {
  return new Promise(function(resolve, reject) {
    db.incomes.find({}, function(err, incomesDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(incomesDoc);
      }
    });
  }).then(incomesDoc => {
    // console.log('Got Expense Doc =>', incomesDoc);
    DATABASE['incomes'] = incomesDoc;
    return incomesDoc;
  });
}

function collectReadyCash() {
  const readyCash = {};
  return new Promise(function(resolve, reject) {
    db.readyCash['income'].find({}, function(err, income) {
      if (err) {
        reject(err);
      } else {
        resolve(income);
      }
    });
  }).then(income => {
    // console.log('Got readyCash income => ', income);
    readyCash['income'] = income;
    return new Promise(function(resolve, reject) {
      db.readyCash['expenses'].find({}, function(err, expenses) {
        if (err) {
          reject(err);
        } else {
          resolve(expenses);
        }
      });
    }).then(expenses => {
      // console.log('Got readyCash expenses => ', expenses);
      readyCash['expenses'] = expenses;
      // console.log('Got readyCash Doc => ', readyCash);
      DATABASE['readyCash'] = readyCash;
      return readyCash;
    });
  });
}

function collectReadyCashAmount() {
  let readyCashAmoumt = { id: '', amount: 0 };
  return new Promise(function(resolve, reject) {
    db['readyCashAmount'].find({}, function(err, readyCashAmountDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(readyCashAmountDoc);
      }
    });
  }).then(readyCashAmountDoc => {
    if (readyCashAmountDoc.length > 0) {
      readyCashAmoumt = { ...readyCashAmountDoc[0] };
    }
    // console.log('Got ReadyCashAmount Doc =>', readyCashAmoumt);
    DATABASE['readyCashAmount'] = readyCashAmoumt;
    return readyCashAmoumt;
  });
}

function collectMemo() {
  let memoNoDoc = { id: '', memoNumber: 1 };
  return new Promise(function(resolve, reject) {
    db['memo'].find({}, function(err, memoDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(memoDoc);
      }
    });
  }).then(memoDoc => {
    if (memoDoc.length > 0) {
      memoNoDoc = { ...memoDoc[0] };
    }
    // console.log('Got Memo Doc =>', memoNoDoc);
    DATABASE['memo'] = memoNoDoc;
    return memoNoDoc;
  });
}

function collectDue() {
  return new Promise(function(resolve, reject) {
    db['due'].find({}, function(err, dueDoc) {
      if (err) {
        reject(err);
      } else {
        resolve(dueDoc);
      }
    });
  }).then(dueDoc => {
    // console.log('Got Due Doc => ', dueDoc);
    DATABASE['due'] = dueDoc;
    return dueDoc;
  });
}

function collectSellsHistory() {
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
        history: singleHistoryItem.history
      };
    });
    // console.log('Got SellsHistory Doc => ', history);
    DATABASE['sellsHistory'] = history;
    return history;
  });
}

function collectStockData() {
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
    // console.log('Got aluminium Doc in stock => ', aluminiumDocs);
    stockData.aluminium = aluminiumDocs;

    return new Promise(function(resolve, reject) {
      db.stock['glass'].find({}, function(err, glassDocs) {
        if (err) {
          reject(err);
        } else {
          resolve(glassDocs);
        }
      });
    }).then(glassDocs => {
      // console.log('Got glass Doc in stock => ', glassDocs);
      stockData.glass = glassDocs;

      return new Promise(function(resolve, reject) {
        db.stock['ss'].find({}, function(err, ssDocs) {
          if (err) {
            reject(err);
          } else {
            resolve(ssDocs);
          }
        });
      }).then(ssDocs => {
        // console.log('Got ss Doc in stock => ', ssDocs);
        stockData.ss = ssDocs;

        return new Promise(function(resolve, reject) {
          db.stock['others'].find({}, function(err, othersDocs) {
            if (err) {
              reject(err);
            } else {
              resolve(othersDocs);
            }
          });
        }).then(othersDocs => {
          // console.log('Got others Doc in stock => ', othersDocs);
          stockData.others = othersDocs;
          // console.log('Got stock Doc => ', stockData);
          DATABASE['stock'] = stockData;
          return stockData;
        });
      });
    });
  });
}

function collectStoreInfo() {
  return new Promise(function(resolve, reject) {
    db['info'].find({}, function(err, docs) {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  }).then(docs => {
    if (docs.length === 0) {
      docs[0] = {
        name: 'Set Your Store NAME',
        number1: 70000000000,
        number2: 90000000000,
        number3: 80000000000,
        address: 'Set Your Store ADDRESS',
        password: 12345
      };
    }
    // console.log('Got StoreInfo Doc => ', docs[0]);
    DATABASE['info'] = docs[0];
    return docs[0];
  });
}

const collectAll = () => {
  return Promise.all([
    collectAdvance(),
    collectExpense(),
    collectIncome(),
    collectReadyCash(),
    collectReadyCashAmount(),
    collectMemo(),
    collectDue(),
    collectSellsHistory(),
    collectStockData(),
    collectStoreInfo()
  ]).then(data => {
    // console.log('=================================');
    // console.log('Promise All Resolved And Got Data');
    // console.log(data);
    // console.log('=================================');
    return DATABASE;
  });
};

export default collectAll;
