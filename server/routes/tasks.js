var express = require('express'); // built all of this before touching client.js
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase){
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500)
        } else{//end if start else
            db.query("SELECT * FROM tasks ORDER BY id_completed, id;", function(errorMakingQuery, result){//can sort by varius collums by ,
                done();//hit done after the query is run
                if(errorMakingQuery){
                    console.log('there was an error making the query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.send(result.rows);
                }
            });//end else
        }//end db.query function
    });//end pool.connect func
});//end GET

router.post('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase){
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500)
        } else{//end if start else
            db.query(`INSERT INTO tasks (name)
            VALUES ($1);`, [req.body.name], function(errorMakingQuery, result){
                done();//hit done after the query is run
                if(errorMakingQuery){
                    console.log('there was an error making the query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201);
                }
            });//end else
        }//end db.query function
    });//end pool.connect func
});//end GET

router.put('/complete',  function(req, res){
    pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase){
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500)
        } else{//end if start else
            db.query(`UPDATE tasks SET is_completed=TRUE WHERE id=$1`, [req.params.id], function(errorMakingQuery, result){//grabs id of button clicked
                done();//hit done after the query is run
                if(errorMakingQuery){
                    console.log('there was an error making the query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(200);
                }
            });//end else
        }//end db.query function
    });//end pool.connect func
});//end GET

router.delete('/remove/:id', function (req, res) {
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`DELETE FROM tasks WHERE id=$1;`, [req.params.id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;