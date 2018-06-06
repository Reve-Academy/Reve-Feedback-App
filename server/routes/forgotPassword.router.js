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
        html: `<h3 className="ManageTitle">Click the link below to reset your password!</h3><br /><href>https://revevoices.herokuapp.com/resetPassword/` + newToken + `</href>`,
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