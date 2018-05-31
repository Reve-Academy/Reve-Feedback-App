const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/weeks/', (req, res) => {
    if (req.isAuthenticated()) {
        const programId = req.query.id;
        let queryText = 'SELECT * FROM weeks WHERE program_id = $1;';
        pool.query(queryText, [programId]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR IN GET WEEKS IN instructorSchedule.router: ', error);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/focus', (req, res) => {
    if (req.isAuthenticated()) {
        let queryText = `SELECT focus.id as f_id, focus.name, focus.summary, focus.week_id, focus.x, focus.y, 
                    focus.w, focus.h, strategies.*, resources.* FROM focus JOIN strategies ON focus.id = 
                    strategies.focus_id JOIN resources ON strategies.id = resources.strategy_id;`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log('ERROR IN GET FOCUS INFO IN instructorSchedule.router: ', err);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.put('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.body);
        const layout = req.body.layout;

        (async() => {
            const client = await pool.connect();
            try{
                await client.query('BEGIN'); //alerts database multiple queries
                for (let j = 0; j < layout.length; j++) {
                    //query Text for adding a focus
                    let updateFocusQueryText = `UPDATE focus SET "x" = $1, "y" = $2, "w" = $3, "h" = $4 WHERE "id" = $5;`;
                    //values to be inserted into focus
                    focusValues = [layout[j].x, layout[j].y, layout[j].w, layout[j].h, layout[j].i];
                    
                    const updateFocusResult = await client.query(updateFocusQueryText, focusValues)
                }
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e){
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((err) => {
            console.log('ERROR IN PUT instructorSchedule.router: ', err);
        });
    } else {
        res.sendStatus(403);
    }
});

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const focus = req.body.infoToAdd;
        const weekId = req.body.week.weekId;

        (async () => {
            //creates async
            const client = await pool.connect();
            try {
                await client.query('BEGIN'); //alerts database multiple queries
                //query Text for adding a focus
                let focusQueryText = `INSERT INTO focus (name, summary, week_id, x, y, w, h) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;
                //values to be inserted into focus
                focusValues = [focus.newFocus.name, focus.newFocus.summary, weekId, focus.newFocus.x, focus.newFocus.y, focus.newFocus.w, focus.newFocus.h];

                const focusResult = await client.query(focusQueryText, focusValues);

                //id of newly created focus
                const focusId = focusResult.rows[0].id;

                //query text for new strategy
                let strategyQueryText = `INSERT INTO strategies (title, summary, focus_id) VALUES ($1, $2, $3) RETURNING "id";`;

                //values to be inserted into strategy
                strategyValues = [focus.newStrategy.title, focus.newStrategy.summary, focusId];

                const strategyResult = await client.query(strategyQueryText, strategyValues);

                //id of newly created strategy
                const strategyId = strategyResult.rows[0].id;

                //query text for new resource
                let resourceQueryText = `INSERT INTO resources (link, strategy_id) VALUES ($1, $2);`;

                //values to be inserted into resource
                resourceValues = [focus.newResource.link, strategyId];

                const resourceResult = await client.query(resourceQueryText, resourceValues);
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((err) => {
            console.log('ERROR IN ASYNC POST: ', err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const focusId = req.params.id
        let queryText = 'DELETE FROM focus WHERE "id" = $1;';
        pool.query(queryText, [focusId]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('ERROR IN DELETE instructorSchedule.router: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;