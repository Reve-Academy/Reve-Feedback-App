const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/weeks/', (req, res) => {
    const programId = req.query.id;
    let queryText = 'SELECT * FROM weeks WHERE program_id = $1;' ; 
    pool.query(queryText, [programId]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR IN GET WEEKS IN instructorSchedule.router: ', error);
    })
});


router.get('/first/', (req, res) => {
    const firstWeek = req.query.id;
    const queryText = `SELECT COUNT("likes"."person_id") as "like_count", "comments"."id" as "commentId", "comments"."id", "comments"."person_id", "comments"."comment","comments"."date","comments"."week_id","weeks"."program_id", "weeks"."number", "person"."first", "person"."last",  "person"."instructor" FROM "weeks" JOIN "comments" ON "weeks"."id" = "comments"."week_id" JOIN "person" ON "person"."id" = "comments"."person_id" LEFT JOIN "likes" ON "likes"."comment_id" = "comments"."id" WHERE "weeks"."program_id"= $1 AND "number" = 1 GROUP BY "comments"."id", "person"."id", "weeks"."id" ORDER BY "comments"."date" DESC;`
    pool.query(queryText, [firstWeek])
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error completing GET person in router', err);
            res.sendStatus(500);
        });
});

router.get('/comment/', (req, res) => {
    const weekNumber = req.query.id;
    console.log(weekNumber);
    const queryText = `SELECT COUNT("likes"."person_id") as "like_count", "person"."id" as "userId", "comments"."id", "comments"."person_id", "comments"."comment","comments"."date","comments"."week_id", "person"."username", "person"."first", "person"."last", "person"."username", "person"."instructor" FROM "person" JOIN "comments" ON "person"."id" = "comments"."person_id" JOIN "weeks" ON "weeks"."id" = "comments"."week_id" LEFT JOIN "likes" ON "likes"."comment_id" = "comments"."id" WHERE "week_id" = $1 GROUP BY "comments"."id", "person"."id"  ORDER BY "comments"."date" DESC;`
    pool.query(queryText, [weekNumber])
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
        pool.query(queryText, [req.user.id, req.body.newComment, req.body.date, req.body.week ]).then((result)=>{
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