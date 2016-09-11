"use strict";

//require('nodetime').profile({
//  accountKey: 'YOUR_KEY',
//  appName: 'profile0'
//});


function Leak() {}


var leaks = []

setInterval(function() {
  for (var i = 0; i < 1000; i++) {
    leaks.push(new Leak)
  }

  console.error(leaks.length)
}, 1000)
