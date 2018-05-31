const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */

router.post('/',(req, res)=>{
    if(req.isAuthenticated()){
        (async () =>{
            const client = await pool.connect();
            try{
                console.log(req.body);
                await client.query('BEGIN');
                let programQueryText =`INSERT INTO "program" ("name", "active_program", "description", "start", "finish") VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
                programValues= [req.body.name, req.body.active_program, req.body.description, req.body.start, req.body.finish];
                const programResult = await client.query(programQueryText, programValues);
                console.log(programValues);
                const programId = programResult.rows[0].id;
                
                for(i=1; i<= req.body.weeks; i++){
                    weeksQueryText = `INSERT INTO "weeks" ("number", "program_id") VALUES ($1, $2);`;
                    weeksValues = [i, programId];
                    const result = await client.query(weeksQueryText, weeksValues);
                }
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch(e){
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((error) =>{
            console.log('error in async new program ', error);
        })
    } else {
        res.sendStatus(403);
    }
})


module.exports = router;