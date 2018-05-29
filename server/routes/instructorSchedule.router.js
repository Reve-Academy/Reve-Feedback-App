const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/weeks/', (req, res) => {
    const programId = req.query.id;
    console.log('programId: ', programId)
    let queryText = 'SELECT * FROM weeks WHERE program_id = $1;' ; 
    pool.query(queryText, [programId]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR IN GET WEEKS IN instructorSchedule.router: ', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const focus = req.body.focus;
    const weekId = req.body.week.weekId;
    const layout = req.body.layout;
    console.log('this is focus: ', focus);
    console.log('this is weekId: ', weekId);
    console.log('this is layout: ', layout);
});

module.exports = router;