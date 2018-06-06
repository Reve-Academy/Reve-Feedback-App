const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route 
  router.get('/', (req, res) => {
    const queryText = `SELECT person.*, count (comments.person_id) AS total_comments FROM person LEFT JOIN comments ON person.id=comments.person_id GROUP BY person.id ORDER BY "person"."last" ASC;`;
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET person in router', err);
            res.sendStatus(500);
        });
});

 
router.get('/', (req, res) => {
    
});
//end get route

//  * POST route template
//  */
router.post('/', (req, res) => {

});

module.exports = router;