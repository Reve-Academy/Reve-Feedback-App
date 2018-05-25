const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route 
  router.get('/', (req, res) => {
    const queryText = `SELECT person.*, count (person.id) as total_comments FROM comments
    JOIN * ON person`


    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET person in router', err);
            res.sendStatus(500);
        });
});

 
router.get('/', (req, res) => {
    
});


//  * POST route template
//  */
router.post('/', (req, res) => {

});

module.exports = router;