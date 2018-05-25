import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import RaisedButton from 'material-ui/RaisedButton';

import { APP_NAME } from '../global/global';
import MenuItems from './MenuItems';

class AppBarMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDrawer: false };
  }

  handleToggle = () => this.setState({ showDrawer: !this.state.showDrawer });

  handleClose = () => this.setState({ showDrawer: false });
  // handleLogOut = () => {
  //   this.props.startLogout();
  // };
  // place below code to <AppBar/> component
  // iconElementRight={
  //   <RaisedButton
  //     primary={true}
  //     label="Logout"
  //     onClick={this.handleLogOut}
  //   />
  // }
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title ? `${this.props.title} Page` : APP_NAME}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.showDrawer}
          onRequestChange={showDrawer => this.setState({ showDrawer })}
        >
          <AppBar
            iconElementLeft={
              <IconButton>
                <NavigationClose />
              </IconButton>
            }
            onLeftIconButtonTouchTap={event => {
              this.setState({ showDrawer: false });
            }}
            title={<span>Menu</span>}
          />

          <MenuItems handleClose={this.handleClose} />
        </Drawer>
      </div>
    );
  }
}

export default AppBarMain;
