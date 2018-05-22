const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all accounts
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM person';
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