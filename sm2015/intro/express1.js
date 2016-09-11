"use strict";

var express = require('express')

var app = express()

app.get('/say/:who',function(req,res){
  res.send("Hello "+req.params.who)
})

app.listen(3000)

