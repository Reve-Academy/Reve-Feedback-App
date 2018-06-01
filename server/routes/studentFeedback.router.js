const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */


 //ROUTE FOR GETTING/LOADING COMMENTS ONTO DOM FROM SERVER
router.get('/', (req, res) => {
	const queryText = `SELECT comment, id, week_id, person_id FROM comments
        ORDER BY week_id DESC`;

	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((err) => {
			console.log('Error completing GET person in router', err);
			res.sendStatus(500);
		});
});
//END ROUTE

//ROUTE FOR GETTING PROGRAM INFORMATION
router.get('/weeks/', (req, res) => {
	const queryText = `SELECT * FROM weeks`;
	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log('ERROR IN GET WEEKS IN studentFeedback.router: ', error);
		});
});
//END ROUTE



/**
 * POST route template
 */


    //ROUTE FOR RECORDING LIKE (STAR CLICK)
router.post('/likes/', (req, res) => {
	if (req.isAuthenticated()) {
		const queryText = `INSERT INTO "likes" ("person_id", "comment_id") VALUES ($1, $2);`;
		pool.query(queryText, [req.user.id, req.body.id])
			.then((result) => {
				res.sendStatus(200);
			})
			.catch((err) => {
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});
//END ROUTE

router.get('/likes/', (req, res) => {
	const queryText = `SELECT * FROM likes`;
	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log('ERROR IN GET likes IN studentFeedback.router: ', error);
		});
});

//ROUTE FOR POSTING COMMENTS INTO SERVER
router.post('/',(req, res)=>{
    if(req.isAuthenticated()){
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

//END ROUTE

//ROUTE FOR UNLIKING COMMENT (UNCHECK STAR)
router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        const queryText = `DELETE FROM "likes" WHERE ("person_id", "comment_id") VALUES ($1, $2);`; 
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
//END DELETE LIKE COMMENT ROUTE

module.exports = router;
