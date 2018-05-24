const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const Chance = require('chance');
const chance = new Chance();

//THESE ROUTES ARE PROTECTED by requiring authentication and admin verification on the ManageAccountsPage

// GET all accounts
router.get('/', (req, res) => {
    const queryText = `SELECT "person"."id", "person"."first", "person"."last", 
    "person"."instructor", "person"."active_profile", 
    "person"."high_school", "person"."team", 
    "person"."program_id", "program"."name" 
    FROM "person" JOIN "program" 
    ON "program"."id" = "person"."program_id";`;
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error getting all accounts', err);
            res.sendStatus(500);
        })
    
});

//ADMIN ONLY - POST NEW ACCOUNT
router.post('/', (req, res)=> {
    const token = chance.hash();
    const username = req.body.username;
    const team = req.body.team;
    const password = req.body.password;
    const program = req.body.program;
    let queryText = `INSERT into "person" ("username", "team", "password", "program_id", "token") VALUES ($1, $2, $3, $4, $5);`
pool.query(queryText, [username, team, password, program, token ]).then((result)=>{
    console.log(`http://localhost: 3000/register/$[token]`); //Nodemailer goes here!!! _ TODO
    res.sendStatus(201);
}).catch((error)=> {
    console.log('Error', error);
    res.sendStatus(500);
})

})


//UPDATE INSTRUCTOR AND ACTIVE STATUS FOR ACCOUNTS
router.put('/:id', (req, res) => {
    // console.log('update activation and instructor statuses', req.body, req.params);
    let account = req.body;
    const queryText = `UPDATE "person" 
                        SET "instructor" = $1, 
                        "active_profile" = $2 
                        WHERE "id" = $3`
    pool.query(queryText, [account.instructor, account.active, account.id])
        .then((response)=> {
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error updating statuses', error);
            res.sendStatus(500);
        })
    
})



//DELETE STUDENT OR INSTRUCTOR ACCOUNT
router.delete('/:id', (req, res)=> {
    console.log('in delete')
    console.log(req.params.id)
    const accountId = req.params.id;
    const queryText = `DELETE FROM "person" WHERE "id" = $1;`
    pool.query(queryText, [accountId]).then((response)=>{
        console.log(response);
        res.sendStatus(200);
    }).catch((err)=>{
        res.sendStatus(500);
    });
});

module.exports = router;