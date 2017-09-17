var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function(req, res){
    console.log('in get tasks route');
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM to_do;', function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError) 
                    res.sendStatus(500);
                } else {
                    console.log('resultObj.rows-->', resultObj.rows);
                    res.send(resultObj.rows);
                }//end if/else query statement
            } ) //end client query function
        }//end connection if/else statement
    }) //end pool function
}) //end get function

router.post('/', function(req, res) {
    console.log('in post tasks route');
    var newTask = req.body;
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO to_do (task) VALUES ($1);';
            var values = [newTask.task];
            client.query (queryString, values, function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } //end query if/else statement
            }) //end query function
        } //end connection if/else statement
    }) //end pool function
}) // end post function

router.put('/:id', function(req, res) {
    console.log('in done route');
    var doneTask = req.params.id;
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('UPDATE to_do SET done= NOT done WHERE id=$1;', [doneTask], function(queryError, result){
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                } //end query if/else statement
            }) //end query
        } //end connectionError if/else statement
    })// end pool function
})//end done function

router.delete('/:id', function(req, res) {
    console.log('in delete route');
    var deleteTask = req.params.id;
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM to_do WHERE id=$1;', [deleteTask], function(queryError, result){
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                } //end query if/else statement
            })//end query 
        } //end connection if/else statement
    })//end pool function
})//end delete function

module.exports = router;