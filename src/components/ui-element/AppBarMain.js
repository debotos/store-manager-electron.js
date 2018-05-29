import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

import { APP_NAME } from '../global/global';
import MenuItems from './MenuItems';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import 'font-awesome/css/font-awesome.min.css';

const { shell } = window.require('electron');

class AppBarMain extends React.Component {
  renderAbout = () => {
    return (
      <div id="profile-wrap">
        <div className="pulse1" />
        <div className="pulse2" />
        <div className="profile-overlay" />
        <div className="profile-image" />
        <div className="profile-name">
          <h2>
            made with love by{' '}
            <p style={{ fontFamily: 'Roboto', fontWeight: 400 }}>Debotos Das</p>
            <span> This Copy is for "National Traders"</span>
          </h2>
        </div>
        <div className="profile-social">
          <ul>
            <li
              onClick={() =>
                shell.openExternal('https://www.linkedin.com/in/debotos-das')
              }
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="Linked In"
                target="_blank"
              >
                <i className="fa fa-linkedin" />
              </a>
            </li>
            <li
              onClick={() =>
                shell.openExternal('https://www.facebook.com/spark.deb.33')
              }
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="Facebook Profile"
                target="_blank"
              >
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li
              onClick={() => shell.openExternal('https://twitter.com/debotos')}
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="Twitter Profile"
                target="_blank"
              >
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li
              onClick={() =>
                shell.openExternal(
                  'https://plus.google.com/u/0/106300308166515392147'
                )
              }
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="Google+ profile"
                target="_blank"
              >
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li
              onClick={() => shell.openExternal('https://github.com/debotos')}
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="github"
                target="_blank"
              >
                <i className="fa fa-github" />
              </a>
            </li>
            <li
              onClick={() => shell.openExternal('https://codepen.io/debotos')}
            >
              <a
                href="javascript:void(0);"
                data-toggle="tooltip"
                title="Codepen"
                target="_blank"
              >
                <i className="fa fa-codepen" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  constructor(props) {
    super(props);
    this.state = { showDrawer: false, open: false };
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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    // const actions = [
    //   <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    // ];
    return (
      <div>
        <AppBar
          title={this.props.title ? `${this.props.title} Page` : APP_NAME}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconButton onClick={this.handleOpen}>
              <ActionInfoOutline />
            </IconButton>
          }
        />
        <Dialog
          bodyClassName="aboutSectionOfCoder"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          bodyStyle={{
            background: 'linear-gradient(135deg,#3b0d4a 0%,#7b1733 100%)',
            fontFamily: 'Raleway',
            overflowY: 'scroll'
          }}
        >
          {this.renderAbout()}
        </Dialog>
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
