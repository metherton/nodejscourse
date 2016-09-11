"use strict";

require('nodetime').profile({
  accountKey: '32ac61b5d3e43537ec0fdb6df0033ee9b79f3eff', 
  appName: 'profile0'
});


function Leak() {}


var leaks = []

setInterval(function() {
  for (var i = 0; i < 1000; i++) {
    leaks.push(new Leak)
  }

  console.error(leaks.length)
}, 1000)
