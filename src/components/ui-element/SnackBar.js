import React, { Component } from "react";
import Snackbar from "material-ui/Snackbar";

export default class SnackBar extends Component {
  render() {
    return (
      <Snackbar
        open={this.props.snackBar}
        message={<b>{this.props.snackBarMessage}</b>}
        action="Okey"
        onActionTouchTap={this.props.handleActionTouchTap}
        autoHideDuration={4000}
        onRequestClose={this.props.handleRequestClose}
      />
    );
  }
}
