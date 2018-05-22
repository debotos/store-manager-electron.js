// Database
var Datastore = require('nedb');

var db = {};
db.expenses = new Datastore({ filename: 'expenses.db', autoload: true });
db.stock = new Datastore({ filename: 'stock.db', autoload: true });
db.due = new Datastore({ filename: 'due.db', autoload: true });
db.sells = new Datastore({ filename: 'sells.db', autoload: true });
db.memo = new Datastore({ filename: 'memo.db', autoload: true });
db.readyCash = new Datastore({ filename: 'readyCash.db', autoload: true });
db.incomes = new Datastore({ filename: 'incomes.db', autoload: true });
db.info = new Datastore({ filename: 'info.db', autoload: true });

export default db;
