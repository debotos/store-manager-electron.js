import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";

class ReadyCashSpalsh extends Component {
  render() {
    return (
      <ReactCountdownClock seconds={1} color="green" alpha={0.9} size={300} />
    );
  }
}

export default ReadyCashSpalsh;
