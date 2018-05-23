const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ROUTER FOR PROGRAMS LIST
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM program';
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET allPrograms in router', err);
            res.sendStatus(500);
        });
});

// PUT FOR EDITING PROGRAMS
router.put('/:id', (req, res) => {
    let p = req.body;
    const queryText = `UPDATE program SET 
        name = $1,
        active_program = $2,
        description = $3,
        start = $4,
        finish = $5
        WHERE id = $6;`;
    pool.query(queryText, [p.name, p.active_program, p.description, p.start, 
        p.finish, p.id])
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET allPrograms in router', err);
            res.sendStatus(500);
        });
});

// DELETE FOR PROGRAMS
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const queryText = `DELETE FROM program WHERE id=$1`
    pool.query(queryText, [id])
    .then(result => { res.send(result.rows); })
    .catch(err => {
        console.log('Error completing DELETE program in router', err);
        res.sendStatus(500);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;