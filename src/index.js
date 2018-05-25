import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/animate.css';
import './style/style.css';

import registerServiceWorker from './registerServiceWorker';

import db from './secrets/neDB';
import MainRouter from './components/Router';
import configureStore from './store/configureStore';

import { startSetStoreInfo } from './actions/storeInfo/store-info-actions';
import { startSetStock } from './actions/stock/stock-action';
import { startSetAdvances } from './actions/advance/advance-actions';
import { startSetExpenses } from './actions/expenses/expenses-actions';
import { startSetIncomes } from './actions/others-income/income-actions';
import { startSetReadyCash } from './actions/ready-cash/ready-cash-actions';
import { startSetReadyCashAmount } from './actions/ready-cash/ready-cash-amount-actions';
import { startSetMemoNumber } from './actions/sells/memo-no-actions';
import { startSetExistingDueFromServer } from './actions/sells/prevDue-actions';
import { startSetAddSellUnderCustomerHistory } from './actions/sells/sells-history-actions';

const store = configureStore();
// store.subscribe(() => {
//   console.log(store.getState());
// });

const jsx = (
  <Provider store={store}>
    <MuiThemeProvider>
      <MainRouter />
    </MuiThemeProvider>
  </Provider>
);

store
  .dispatch(startSetStoreInfo())
  .then(() => {
    return store.dispatch(startSetStock());
  })
  .then(() => {
    return store.dispatch(startSetAdvances());
  })
  .then(() => {
    return store.dispatch(startSetExpenses());
  })
  .then(() => {
    return store.dispatch(startSetIncomes());
  })
  .then(() => {
    return store.dispatch(startSetMemoNumber());
  })
  .then(() => {
    return store.dispatch(startSetReadyCash());
  })
  .then(() => {
    return store.dispatch(startSetReadyCashAmount());
  })
  .then(() => {
    return store.dispatch(startSetExistingDueFromServer());
  })
  .then(() => {
    return store.dispatch(startSetAddSellUnderCustomerHistory());
  })
  .then(() => {
    ReactDOM.render(jsx, document.getElementById('root'));
  });

// ReactDOM.render(jsx, document.getElementById('root'));

registerServiceWorker();
