const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all accounts
router.get('/', (req, res) => {
    const queryText = `SELECT "person"."first", "person"."last", 
    "person"."instructor", "person"."active_profile", 
    "person"."high_school", "person"."team", 
    "person"."program_id", "program"."name" 
    FROM "person" JOIN "program" 
    ON "program"."id" = "person"."program_id";`;
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error getting all accounts', err);
            res.sendStatus(500);
        })
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;