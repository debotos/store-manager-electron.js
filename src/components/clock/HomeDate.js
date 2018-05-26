import React, { Component } from 'react';

export default class HomeDate extends Component {
  componentDidMount() {
    let currentTime = new Date();
    var day = currentTime.getDay();
    var dayDate = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();

    var dayWeek = [
      [1, 'Monday'],
      [2, 'Tuesday'],
      [3, 'Wednesday'],
      [4, 'Thursday'],
      [5, 'Friday'],
      [6, 'Saturday'],
      [0, 'Sunday']
    ];

    var monthInfo = [
      [0, 'January'],
      [1, 'February'],
      [2, 'March'],
      [3, 'April'],
      [4, 'May'],
      [5, 'June'],
      [6, 'July'],
      [7, 'August'],
      [8, 'September'],
      [9, 'October'],
      [10, 'November'],
      [11, 'December']
    ];

    function getName(arg1, arrayvalue) {
      for (var i = 0; i < arrayvalue.length; i++) {
        if (arg1 === arrayvalue[i][0]) {
          return arrayvalue[i][1];
        }
      }
    }

    function addLead0(arg1) {
      if (arg1 < 10) {
        return '0' + arg1;
      } else {
        return arg1;
      }
    }

    function getMeridiem(arg1) {
      if (arg1 >= 12) {
        return 'PM';
      } else {
        return 'AM';
      }
    }

    function realHour(arg1) {
      var output;
      if (arg1 > 12) {
        output = arg1 - 12;
        return output;
      } else if (arg1 === 12 || arg1 === 0) {
        output = 12;
        return output;
      } else {
        return arg1;
      }
    }

    //output
    var dayname = document.getElementById('dayname');
    dayname.innerHTML = getName(day, dayWeek);

    var dateinfo = document.getElementById('dateinfo');
    dateinfo.innerHTML =
      getName(month, monthInfo) + ' ' + addLead0(dayDate) + ' ' + year;

    function timeoutput() {
      let currentTime = new Date();
      let hour = currentTime.getHours();
      let min = currentTime.getMinutes();
      let sec = currentTime.getSeconds();
      var timeinfo = document.getElementById('timeinfo');
      var output =
        addLead0(realHour(hour)) +
        ':' +
        addLead0(min) +
        ':' +
        addLead0(sec) +
        ' ' +
        getMeridiem(hour);
      if (timeinfo) {
        timeinfo.innerHTML = output;
      }
    }

    setInterval(timeoutput, 1000);

    function refreshData() {
      let x = 1; // x = seconds
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();

      if (h <= 9) {
        h = '0' + h;
      }
      if (m <= 9) {
        m = '0' + m;
      }
      if (s <= 9) {
        s = '0' + s;
      }

      // var color = '#' + h + m + s;

      // $('.backgroundinfo').css('background-color', color);
      // $('p#hex').text(color);

      setTimeout(refreshData, x * 1000);
    }

    refreshData();
  }

  render() {
    return (
      <div id="clockAndDate">
        <div id="dayname" />
        <div id="dateinfo" />
        <div id="timeinfo" />
      </div>
    );
  }
}
