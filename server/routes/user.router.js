const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const Chance = require('chance');
const chance = new Chance();

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
  console.log(req.user);
});


//USER - UPDATE PASSWORD WHERE TOKEN LINES UP

router.put('/register/:token', (req, res, next) => {

  const highschool = req.body.high_school;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const token = req.body.token;
  //New token, because the old one gets expired 
  const newToken = chance.hash();
  
 

  //THIS IS WHERE WE WE VALIDATE THE EMAIL by checking the TOKEN 
  const queryText = `UPDATE "person" SET "high_school" = $1, "username" = $2, "password" = $3, "token" = $4 WHERE "token" = $5;`
  pool.query(queryText, [highschool, username, password, newToken, token]).then((result)=>{
      
      
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
