import _ from 'lodash';
import db from '../../secrets/neDB';

const restoreAdvanceDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.advances.insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreExpenseDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.expenses.insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreIncomeDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.incomes.insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restorereadyCashAmountDB = data => {
  if (!_.isEmpty(data)) {
    return new Promise(function(resolve, reject) {
      db.readyCashAmount.insert(data, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {});
  }
};

const restoreMemoDB = data => {
  if (!_.isEmpty(data)) {
    return new Promise(function(resolve, reject) {
      db.memo.insert(data, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    }).then(newDoc => {});
  }
};

const restoreDueDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.due.insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreInfoDB = data => {
  if (!_.isEmpty(data)) {
    return new Promise(function(resolve, reject) {
      db['info'].insert(data, function(err, newDoc) {
        if (err) {
          reject(err);
        } else {
          console.log('Info Updated!');
          resolve(newDoc);
        }
      });
    }).then(newDoc => {});
  }
};

const restoreReadyCashIncomeDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.readyCash['income'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreReadyCashExpenseDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.readyCash['expenses'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreStockAluminiumDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.stock['aluminium'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreStockGlassDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.stock['glass'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreStockSSDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.stock['ss'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreStockOthersDB = data => {
  if (data.length > 0) {
    data.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db.stock['others'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

const restoreSellsHistory = obj => {
  let sellsHistoryArray = [];
  for (var key in obj) {
    let singleHistory = {
      number: key,
      history: obj[key].history
    };
    console.log('Setting up History => ', singleHistory);
    sellsHistoryArray.push(singleHistory);
  }
  if (sellsHistoryArray.length > 0) {
    sellsHistoryArray.forEach(singleItem => {
      return new Promise(function(resolve, reject) {
        db['sellsHistory'].insert(singleItem, function(err, newDoc) {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      }).then(newDoc => {});
    });
  }
};

export default function restoreDB(data) {
  restoreAdvanceDB(data.advances);
  restoreExpenseDB(data.expenses);
  restoreIncomeDB(data.incomes);
  restorereadyCashAmountDB(data.readyCashAmount);
  restoreMemoDB(data.memo);
  restoreDueDB(data.due);
  restoreInfoDB(data.info);
  restoreReadyCashIncomeDB(data.readyCash.income);
  restoreReadyCashExpenseDB(data.readyCash.expenses);
  restoreStockAluminiumDB(data.stock.aluminium);
  restoreStockGlassDB(data.stock.glass);
  restoreStockSSDB(data.stock.ss);
  restoreStockOthersDB(data.stock.others);
  restoreSellsHistory(data.sellsHistory);
}
