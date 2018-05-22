import { combineReducers } from "redux";

// import { bankReducer } from "./bank/bank-reducer";

import incomeReducer from "./others-income/income-reducer";
import advanceReducer from "./advance/advance-reducer";
import incomeFiltersReducer from "./others-income/incomes-filters-reducer";
import advanceFiltersReducer from "./advance/advances-filters-reducer";

import expensesReducer from "./expenses/expenses-reducer";
import filtersReducer from "./expenses/expenses-filters-reducer";

import { storeInfoReducer } from "./storeInfo/store-info-reducer";

import { sellsReducer } from "./sells/sells-reducer";
import { stockReducer } from "./stock/stock-reducer";
import { sellsHistoryReducer } from "./sells/sells-history-reducer";
import { prevDueReducer } from "./sells/prevDue-reducer";
import dueFilterReducer from "./due/due-filter-reducer";
import memoNoReducer from "./sells/memo-no-reducer";
import { tableReducer } from "./sells/table-reducers";
import { readyCashReducer } from "./ready-cash/ready-cash-reducers";
import { readyCashAmountReducer } from "./ready-cash/ready-cash-amount-reducers";
import authReducer from "./auth";

const RootReducer = combineReducers({
  // bank: bankReducer,
  income: incomeReducer,
  advance: advanceReducer,
  expenses: expensesReducer,
  filters: filtersReducer,
  incomeFilter: incomeFiltersReducer,
  advanceFilter: advanceFiltersReducer,
  sells: sellsReducer,
  stock: stockReducer,
  sellsHistory: sellsHistoryReducer,
  due: prevDueReducer,
  dueFilter: dueFilterReducer,
  memoNumber: memoNoReducer,
  sellsTable: tableReducer,
  readyCash: readyCashReducer,
  readyCashAmount: readyCashAmountReducer,
  storeInfo: storeInfoReducer,
  auth: authReducer
});

export default RootReducer;
