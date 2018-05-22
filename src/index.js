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

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});

const jsx = (
  <Provider store={store}>
    <MuiThemeProvider>
      <MainRouter />
    </MuiThemeProvider>
  </Provider>
);

store.dispatch(startSetStoreInfo()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});

// ReactDOM.render(jsx, document.getElementById('root'));

registerServiceWorker();
