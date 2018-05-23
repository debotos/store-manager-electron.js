// Database
var Datastore = require('nedb');

var db = {};
db.stock = {};
db.expenses = new Datastore({ filename: 'expenses.db', autoload: true });
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
db.sells = new Datastore({ filename: 'sells.db', autoload: true });
db.memo = new Datastore({ filename: 'memo.db', autoload: true });
db.readyCash = new Datastore({ filename: 'readyCash.db', autoload: true });
db.incomes = new Datastore({ filename: 'incomes.db', autoload: true });
db.info = new Datastore({ filename: 'info.db', autoload: true });

export default db;
