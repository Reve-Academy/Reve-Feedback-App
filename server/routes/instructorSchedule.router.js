const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/weeks/', (req, res) => {
    if(req.isAuthenticated()){
    const programId = req.query.id;
    let queryText = 'SELECT * FROM weeks WHERE program_id = $1;' ; 
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
    if(req.isAuthenticated()) {
    let queryText = `SELECT focus.*, strategies.*, resources.* FROM focus JOIN strategies ON focus.id = strategies.focus_id JOIN resources ON strategies.id = resources.strategy_id;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log('ERROR IN GET FOCUS INFO IN instructorSchedule.router: ', err);
    })
    } else{
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {
//     console.log(req.body);
//     const schedule = req.body.schedule;
//     const weekId = req.body.week.weekId;

//     (async () => {
//         //creates async
//         const client = await pool.connect();
//         try{
//             await client.query('BEGIN'); //alerts database multiple queries
//             //FOR loop that creates new focuses that can be references in later query
//             for(let i = 0; i < schedule.focus.length; i++){
//                 console.log('length of focus: ', schedule.focus.length);
//                 // Assumption is that these arrays will ALWAYS be same size
//                 const layoutItem = schedule.layout[i];
//                 //query Text for adding a focus
//                 let focusQueryText = `INSERT INTO focus (name, summary, week_id, x, y, w, h) 
//                                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;
//                 //values to be inserted into focus
//                 focusValues = [schedule.focus[i].newFocus.name, schedule.focus[i].newFocus.summary, weekId, layoutItem.x, layoutItem.y, layoutItem.w, layoutItem.h];
                
//                 const focusResult = await client.query(focusQueryText, focusValues);
                
//                 //id of newly created focus
//                 const focusId = focusResult.rows[0].id;
                
//                 //query text for new strategy
//                 let strategyQueryText = `INSERT INTO strategies (title, summary, focus_id) VALUES ($1, $2, $3) RETURNING "id";`;
                
//                 //values to be inserted into strategy
//                 strategyValues = [schedule.focus[i].newStrategy.title, schedule.focus[i].newStrategy.summary, focusId];

//                 const strategyResult = await client.query(strategyQueryText, strategyValues);

//                 //id of newly created strategy
//                 const strategyId = strategyResult.rows[0].id;

//                 //query text for new resource
//                 let resourceQueryText = `INSERT INTO resources (link, strategy_id) VALUES ($1, $2);`;

//                 //values to be inserted into resource
//                 resourceValues = [schedule.focus[i].newResource.link, strategyId];

//                 const resourceResult = await client.query(resourceQueryText, resourceValues);
//             }
//             await client.query('COMMIT');
//             res.sendStatus(201);
//         } catch (e) {
//             console.log('ROLLBACK', e);
//             await client.query('ROLLBACK');
//             throw e;
//         } finally {
//             client.release();
//         }
//     })().catch((err) => {
//         console.log('ERROR IN ASYNC POST: ', err);
//         res.sendStatus(500);
//     });
// });

router.post('/', (req, res) => {
    if(req.isAuthenticated()){
    const focus = req.body.infoToAdd;
    const weekId = req.body.week.weekId;

    (async() => {
        //creates async
        const client = await pool.connect();
        try{
            await client.query('BEGIN'); //alerts database multiple queries
            //query Text for adding a focus
            let focusQueryText = `INSERT INTO focus (name, summary, week_id, x, y, w, h) 
                                  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;
            //values to be inserted into focus
            focusValues = [focus.newFocus.name, focus.newFocus.summary, weekId,focus.newFocus.x, focus.newFocus.y, focus.newFocus.w, focus.newFocus.h];

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
} else{
    res.sendStatus(403);
}
});

module.exports = router;