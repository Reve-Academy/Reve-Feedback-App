const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

    
    router.get('/', (req, res) => {
        const queryText = `SELECT comment, week_id FROM comments
        ORDER BY id DESC`;
       
        pool.query(queryText)
            .then(result => { res.send(result.rows); })
            .catch(err => {
                console.log('Error completing GET person in router', err);
                res.sendStatus(500);
            });
    });

    router.get('/weeks/', (req, res) => {
        const programId = req.query.id;
        let queryText = `SELECT program_id FROM weeks ORDER BY id DESC`; 
        pool.query(queryText, [programId]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR IN GET WEEKS IN studentFeedback.router: ', error);
        })
    });
    

/**
 * POST route template
 */

    router.post('/',(req, res)=>{
        if(req.isAuthenticated()){
            console.log('this is req.body,', req.body);
            let queryText=`INSERT INTO "comments" ("person_id", "comment", "date", "week_id") VALUES ($1, $2, $3, $4);`;
            pool.query(queryText, [req.user.id, req.body.newComment, req.body.date, req.body.week_id ]).then((result)=>{
                res.sendStatus(200);
            }).catch((err)=>{
                res.sendStatus(500);
            })
        } else {
            res.sendStatus(403);
        }
    })


module.exports = router;