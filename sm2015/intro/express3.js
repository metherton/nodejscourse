"use strict";

var express    = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use( express.static( __dirname+'/public') )
app.use( bodyParser.json() )


app.get('/say/:who',function(req,res){
  res.send("Hello "+req.params.who)
})

app.get('/ping',function(req,res){
  res.send({pong:new Date().toISOString()})
})

app.post('/print',function(req,res){
  console.dir( req.body )
  res.send({ok:true})
})

app.listen(3000)

// curl -X POST -H "Content-Type: application/json" -d '{"foo":1}' http://localhost:3000/print

