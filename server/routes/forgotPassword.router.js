const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const Chance = require('chance');
const chance = new Chance();
const nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
const nodeoutlook = require('nodejs-nodemailer-outlook')
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');


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



// //RESET PASSWORD, SEND EMAIL TO SELF - UPDATE PASSWORD
// router.post('/', (req, res)=> {
//     console.log('in post account')
//     const passwordToken = chance.hash();
//     const first = req.body.first;
//     const last = req.body.last;
//     const username = req.body.username;
//     const team = req.body.team;
//     const password = encryptLib.encryptPassword(req.body.password);
//     const program = req.body.program;
//     let mailOptions = {
//         from: "reveacademy.register@gmail.com",
//         to: req.body.username,
//         subject: "Rêve Academy - Create Your Account!",
//         generateTextFromHTML: true,
//         html: `<href>http://localhost:3000/register/` + passwordToken + `</href>`, 
//       };

//     let queryText = `INSERT into "person" ("first", "last", "username", "team", "password", "program_id", "token") VALUES ($1, $2, $3, $4, $5, $6, $7);`
// pool.query(queryText, [first, last, username, team, password, program, passwordToken ]).then((result)=>{

//     //Nodemailer SEND EMAIL
//     transporter.sendMail(mailOptions, function(error, response) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(response);
//         }
//         transporter.close();
//       });
//     res.sendStatus(201);
// }).catch((error)=> {
//     console.log('Error', error);
//     res.sendStatus(500);
// })

// })



//USER - UPDATE PASSWORD WHEN TOKEN LINES UP
router.put('/:username', (req, res, next) => {


    const username = req.params.username
    // const newPassword = encryptLib.encryptPassword(req.body.password);
    const newToken = chance.hash();

    let mailOptions = {
        from: "reveacademy.register@gmail.com",
        to: req.params.username,
        subject: "Rêve Academy - Reset Password!",
        generateTextFromHTML: true,
        html: `<href>http://localhost:3000/register/` + newToken + `</href>`,
    };

    const queryText = `UPDATE "person" SET "token" = $1 WHERE "username" = $2;`
    pool.query(queryText, [newToken, username]).then((result) => {
        res.sendStatus(200)
        if (result.rows == 0) {
            return res.sendStatus(401)
        }
    }).catch((error) => {
        console.log('Error', error);
        res.sendStatus(500);
    })
    //Nodemailer SEND EMAIL
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
        transporter.close();
    });

})

module.exports = router;