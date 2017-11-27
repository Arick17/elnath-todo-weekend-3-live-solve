var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Hey there!');
})

var pool = require('../modules/pool');

// router.get('/tasks', function (req, res) {
//     pool.connect(function (errorConnectingToDatabase, client, done) {//attempting connect to DB
//         if (errorConnectingToDatabase) {
//             //there was and error connecting to the DB
//             console.log('Error connecting to DB', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             //we connected to the DB!
//             //Now we are going to GET things from the DB
//             client.query('SELECT * FROM tasks;', function (errorMakingTheQuery, result) {//Query is like from postico
//                 done();//calls to close the connection and put it back in the pg pool
//                 if (errorMakingTheQuery) {
//                     //Query failed. Did you test it in Postico?
//                     //Log the error
//                     console.log('Error making query', errorMakingTheQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }//end else
//             });//end func
//         }
//     });//end connecting to DB
  
//   });


module.exports = router;