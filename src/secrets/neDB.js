// Database
var Datastore = require('nedb');

// const app = window.require('electron').remote.app;
// var fs = window.require('fs');
// var path = window.require('path');

// var homePath = app.getPath('home');
// console.log('++++++++++++++++++++++++++++++++');
// console.log(homePath);
// console.log('++++++++++++++++++++++++++++++++');

// let DBPATH = homePath + '/Database';

// if (!fs.existsSync(DBPATH)) {
//   fs.mkdirSync(DBPATH);
// }

var db = {};

db.stock = {};
db.stock.aluminium = new Datastore({
  filename: 'stock.aluminium.db',
  autoload: true
});
db.stock.glass = new Datastore({
  filename: 'stock.glass.db',
  autoload: true
});
db.stock.ss = new Datastore({ filename: 'stock.ss.db', autoload: true });
db.stock.others = new Datastore({
  filename: 'stock.others.db',
  autoload: true
});

db.due = new Datastore({ filename: 'due.db', autoload: true });
db.sellsHistory = new Datastore({
  filename: 'sellsHistory.db',
  autoload: true
});
db.memo = new Datastore({ filename: 'memo.db', autoload: true });
db.info = new Datastore({ filename: 'info.db', autoload: true });

db.readyCash = {};
db.readyCashAmount = new Datastore({
  filename: 'readyCashAmount.db',
  autoload: true
});
db.readyCash.income = new Datastore({
  filename: 'readyCash.income.db',
  autoload: true
});
db.readyCash.expenses = new Datastore({
  filename: 'readyCash.expenses.db',
  autoload: true
});

db.incomes = new Datastore({ filename: 'incomes.db', autoload: true });
db.expenses = new Datastore({ filename: 'expenses.db', autoload: true });
db.advances = new Datastore({ filename: 'advances.db', autoload: true });

export default db;
