var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase){
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            done();//hit done after the query is run
            res.sendStatus(500)
        } else{//end if start else
            db.query("SELECT * FROM tasks;", function(errorMakingQuery, result){
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
            done();//hit done after the query is run
            res.sendStatus(500)
        } else{//end if start else
            db.query(`INSERT INTO tasks (name)
            VALUES ($1);`, [req.body.name], function(errorMakingQuery, result){
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


module.exports = router;