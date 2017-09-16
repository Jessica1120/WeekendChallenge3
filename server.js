//requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//routes
var indexRouter = require('./routes/index');
var requestRouter = require('./routes/requests');

//middleware
app.use(bodyParser.urlencoded({extended: true}));

//app.use
app.use(express.static('public'));

app.use('/', indexRouter);
//app.use('/task', requestRouter);

//server spin-up
app.listen(3000, function(){
    console.log('listening on port 3000');
});