import React, { Component } from 'react';
import '../../style/table-clock.css';

export default class TableClock extends Component {
  componentDidMount() {
    //initialize the clock in a self-invoking function
    (function clock() {
      var hour = document.getElementById('hour'),
        min = document.getElementById('min'),
        sec = document.getElementById('sec');
      //set up a loop
      (function loop() {
        window.setTimeout(loop, 1000 / 60);
        draw();
      })();
      //position the hands
      function draw() {
        var now = new Date(), //now
          then = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0
          ), //midnight
          diffInMil = now.getTime() - then.getTime(), // difference in milliseconds
          h = diffInMil / (1000 * 60 * 60), //hours
          m = h * 60, //minutes
          s = m * 60; //seconds
        //rotate the hands accordingly
        sec.style.webkitTransform = 'rotate(' + s * 6 + 'deg)';
        hour.style.webkitTransform = 'rotate(' + (h * 30 + h / 2) + 'deg)';
        min.style.webkitTransform = 'rotate(' + m * 6 + 'deg)';
      }
    })();
  }

  render() {
    return (
      <div id="clock">
        <div className="hour">
          <div className="min" />
          <div className="min" />
          <div className="min" />
          <div className="min" />
          <div className="min" />
        </div>
        <div className="hour">
          <div className="min" />
          <div className="min" />
          <div className="min" />
          <div className="min" />
          <div className="min" />
        </div>
        <div id="alarm"> </div>
        <div id="min" />
        <div id="hour" />
        <div id="sec" />
        <ol>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ol>
      </div>
    );
  }
}
