import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SnackBar from '../ui-element/SnackBar';

import AppBarMain from '../ui-element/AppBarMain';
import AddAdvanceForm from './subPages/advance/AddAdvanceForm';
import AdvanceDashboardPage from './subPages/advance/AdvanceDashboardPage';

class Advance extends Component {
  // SnackBar Functions
  handleActionTouchTap = () => {
    this.setState({
      snackBar: false
    });
  };

  handleRequestClose = () => {
    this.handleActionTouchTap();
  };

  showSnackBar = message => {
    this.setState({
      snackBar: true,
      snackBarMessage: message
    });
  };
  // End

  handleTabChange = value => {
    this.setState({
      tabSlideIndex: value
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      snackBar: false,
      snackBarMessage: '',
      tabSlideIndex: 0
    };
  }

  render() {
    return (
      <div>
        <AppBarMain title={'Advance'} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h1 id="title-heading"> ADVANCE RECORD</h1>
        </div>

        <div>
          <div>
            <Tabs
              className="container"
              onChange={this.handleTabChange}
              value={this.state.tabSlideIndex}
            >
              <Tab label="Advance List" value={0} />
              <Tab label="Add Advance" value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.tabSlideIndex}
              onChangeIndex={this.handleTabChange}
            >
              <div>
                <AdvanceDashboardPage showSnackBar={this.showSnackBar} />
              </div>
              <div>
                <AddAdvanceForm showSnackBar={this.showSnackBar} />
              </div>
            </SwipeableViews>
          </div>
        </div>
        <SnackBar
          snackBar={this.state.snackBar}
          snackBarMessage={this.state.snackBarMessage}
          handleActionTouchTap={this.handleActionTouchTap}
          handleRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Advance;
