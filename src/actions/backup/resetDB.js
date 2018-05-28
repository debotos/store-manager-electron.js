import db from '../../secrets/neDB';

const resetAdvanceDB = () => {
  return new Promise(function(resolve, reject) {
    db.advances.remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Advances DB Deleted!');
    return numRemoved;
  });
};

const resetExpenseDB = () => {
  return new Promise(function(resolve, reject) {
    db.expenses.remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Expenses DB Deleted!');
    return numRemoved;
  });
};

const resetIncomeDB = () => {
  return new Promise(function(resolve, reject) {
    db.incomes.remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Incomes DB Deleted!');
    return numRemoved;
  });
};

const resetReadyCashDB = () => {
  const readyCashRemoved = {};
  return new Promise(function(resolve, reject) {
    db.readyCash['income'].remove({}, { multi: true }, function(
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
    readyCashRemoved['income'] = numRemoved;
    return new Promise(function(resolve, reject) {
      db.readyCash['expenses'].remove({}, { multi: true }, function(
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
      readyCashRemoved['expenses'] = numRemoved;
      return readyCashRemoved;
    });
  });
};

const resetReadyCashAmountDB = () => {
  return new Promise(function(resolve, reject) {
    db['readyCashAmount'].remove({}, { multi: true }, function(
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
    console.log('ReadyCashAmount DB Deleted!');
    return numRemoved;
  });
};

const resetMemoDB = () => {
  return new Promise(function(resolve, reject) {
    db['memo'].remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Memo DB Deleted!');
    return numRemoved;
  });
};

const resetPrevDueDB = () => {
  return new Promise(function(resolve, reject) {
    db['due'].remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('PrevDue DB Deleted!');
    return numRemoved;
  });
};

const resetSellHistoryDB = () => {
  return new Promise(function(resolve, reject) {
    db['sellsHistory'].remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Sells History DB Deleted!');
    return numRemoved;
  });
};

const resetStockDB = () => {
  const stockRemoved = {};
  return new Promise(function(resolve, reject) {
    db.stock['aluminium'].remove({}, { multi: true }, function(
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
    stockRemoved['aluminium'] = numRemoved;
    console.log('aluminium DB Deleted!');
    return new Promise(function(resolve, reject) {
      db.stock['glass'].remove({}, { multi: true }, function(err, numRemoved) {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    }).then(numRemoved => {
      stockRemoved['glass'] = numRemoved;
      console.log('glass DB Deleted!');
      return new Promise(function(resolve, reject) {
        db.stock['ss'].remove({}, { multi: true }, function(err, numRemoved) {
          if (err) {
            reject(err);
          } else {
            resolve(numRemoved);
          }
        });
      }).then(numRemoved => {
        stockRemoved['ss'] = numRemoved;
        console.log('ss DB Deleted!');
        return new Promise(function(resolve, reject) {
          db.stock['others'].remove({}, { multi: true }, function(
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
          stockRemoved['others'] = numRemoved;
          console.log('others DB Deleted!');
          return stockRemoved;
        });
      });
    });
  });
};

const resetInfoDB = () => {
  return new Promise(function(resolve, reject) {
    db['info'].remove({}, { multi: true }, function(err, numRemoved) {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  }).then(numRemoved => {
    console.log('Info DB Deleted!');
    return numRemoved;
  });
};

const deleteAllDB = () => {
  return Promise.all([
    resetAdvanceDB(),
    resetExpenseDB(),
    resetIncomeDB(),
    resetReadyCashDB(),
    resetReadyCashAmountDB(),
    resetMemoDB(),
    resetPrevDueDB(),
    resetSellHistoryDB(),
    resetStockDB(),
    resetInfoDB()
  ]).then(data => {
    // console.log('=================================');
    // console.log('deleteAllDB() Promise All Resolved And Got Data');
    // console.log(data);
    // console.log('=================================');
    return data;
  });
};

export default deleteAllDB;
