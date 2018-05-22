const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */

router.post('/',(req, res)=>{
    if(req.isAuthenticated()){
        console.log('this is req.body,', req.body);
        let queryText=`INSERT INTO "program" ("name", "active_program", "description", "start", "finish") VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText, [req.body.name, req.body.active_program, req.body.description, req.body.start, req.body.finish ]).then((result)=>{
            res.sendStatus(200);
        }).catch((err)=>{
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;