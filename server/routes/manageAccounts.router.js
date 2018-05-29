const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const Chance = require('chance');
const chance = new Chance();
const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
const nodeoutlook = require('nodejs-nodemailer-outlook')

//Nodemailer specific account information
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       
            user: 'reveacademy.register@gmail.com',
            type: 'OAuth2',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessUrl: 'https://www.googleapis.com/oauth2/v4/token',
            expires: 1
       
    },
    debug: true
});

transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});


//THESE ROUTES ARE PROTECTED by requiring authentication and admin verification on the ManageAccountsPage

// GET all accounts
router.get('/', (req, res) => {
    const queryText = `SELECT "person"."id", "person"."first", "person"."last", 
    "person"."instructor", "person"."active_profile", 
    "person"."high_school", "person"."team", 
    "person"."program_id", "program"."name" 
    FROM "person" JOIN "program" 
    ON "program"."id" = "person"."program_id" ORDER BY "person"."last" DESC, "active_profile" DESC;`;
    pool.query(queryText)
        .then(result => { res.send(result.rows); })
        .catch(err => {
            console.log('Error getting all accounts', err);
            res.sendStatus(500);
        })
    
});

//ADMIN ONLY - POST NEW ACCOUNT
router.post('/', (req, res)=> {
    console.log('in post account')
    const passwordToken = chance.hash();
    const first = req.body.first;
    const last = req.body.last;
    const username = req.body.username;
    const team = req.body.team;
    const password = req.body.password;
    const program = req.body.program;
    let mailOptions = {
        from: "reveacademy.register@gmail.com",
        to: req.body.username,
        subject: "Rêve Academy - Create Your Account!",
        generateTextFromHTML: true,
        html: `<href>http://localhost:3000/register/` + passwordToken + `</href>`, 
      };

    let queryText = `INSERT into "person" ("first", "last", "username", "team", "password", "program_id", "token") VALUES ($1, $2, $3, $4, $5, $6, $7);`
pool.query(queryText, [first, last, username, team, password, program, passwordToken ]).then((result)=>{
  
    //Nodemailer SEND EMAIL
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
        transporter.close();
      });
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