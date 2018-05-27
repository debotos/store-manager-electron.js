import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import OthersIncome from './pages/OthersIncome';
import Due from './pages/Due';
import Expenses from './pages/Expenses';
import Fabrication from './pages/Fabrication';
import MoneyReceipt from './pages/MoneyReceipt';
import Pad from './pages/Pad';
import ReadyCash from './pages/ReadyCash';
import Sell from './pages/Sells';
import Stock from './pages/Stock';
import Advance from './pages/Advance';
import Backup from './pages/Backup';
import Home from './Home';

export const history = createHashHistory();

class MainRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path="/readycash" component={ReadyCash} exact={true} />
            <Route path="/sell" component={Sell} exact={true} />
            <Route path="/fabrication" component={Fabrication} exact={true} />
            <Route
              path="/others-income"
              component={OthersIncome}
              exact={true}
            />
            <Route path="/expenses" component={Expenses} exact={true} />
            <Route path="/due" component={Due} exact={true} />
            <Route path="/moneyreceipt" component={MoneyReceipt} exact={true} />
            <Route path="/pad" component={Pad} exact={true} />
            <Route path="/stock" component={Stock} exact={true} />
            <Route path="/advance" component={Advance} exact={true} />
            <Route path="/backup" component={Backup} exact={true} />
            <Route path="/" component={Home} exact={true} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default MainRouter;
