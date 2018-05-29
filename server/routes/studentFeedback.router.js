const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    router.get('/weeks', (req, res) =>{
        const queryText = `SELECT * FROM "lesson";`
        pool.query(queryText)
            .then(result => { 
                res.send(result.rows); 
            }).catch(err => {
                console.log('Error GET weeks in feedback', err);
                res.sendStatus(500);
            });
    })
    
    router.get('/comment', (req, res) => {
        const queryText = `SELECT "comments"."comment","comments"."date" ORDER BY id DESC;
        `;
        pool.query(queryText)
            .then(result => { res.send(result.rows); })
            .catch(err => {
                console.log('Error completing GET person in router', err);
                res.sendStatus(500);
            });
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;