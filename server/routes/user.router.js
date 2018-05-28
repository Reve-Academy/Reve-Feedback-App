const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
  console.log(req.user);
});


//USER - UPDATE PASSWORD WHERE TOKEN LINES UP
router.put('/register/:id/:token', (req, res, next) => {
  const first = req.body.first;
  const last = req.body.last;
  const highschool = req.body.high_school;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const id = req.body.id
  const token = req.body.token;

  //THIS IS WHERE WE WE VALIDATE THE EMAIL or CHECK TOKEN LENGTH 
  const queryText = `UPDATE "person" SET "first" = $1, "last" = $2, "high_school" = $3, "username" = $4, "password" = $5 WHERE "token" = $6 AND "id" = $7;`
  pool.query(queryText, [first, last, highschool, username, password, token, id]).then((result)=>{
      res.sendStatus(201);
  }).catch((error)=>{
      console.log('Error', error);
      res.sendStatus(500);
  })
})









// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
