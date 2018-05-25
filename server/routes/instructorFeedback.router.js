const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT "person"."id" as "userId", "comments"."id", "comments"."person_id", "comments"."comment","comments"."date","comments"."week_id", "person"."username", "person"."first", "person"."last", "person"."email", "person"."program_id" FROM "person" JOIN "comments" ON "person"."id" = "comments"."person_id" ORDER BY id DESC;
    `;
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET person in router', err);
            res.sendStatus(500);
        });
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

router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const queryText = `DELETE FROM "comments" WHERE id = $1`; 
        pool.query(queryText, [req.params.id])
        .then((result)=> {
            res.sendStatus(200);
        }).catch((err)=>{
            console.log('ERROR DELETE /api/collection', err)
            res.sendStatus(500);
        });
    }
    else {
        res.sendStatus(403); 
    }
});

module.exports = router;