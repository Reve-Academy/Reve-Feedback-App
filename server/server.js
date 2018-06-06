
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const allProgramsRouter = require('./routes/allPrograms.router');
const manageAccountsRouter = require('./routes/manageAccounts.router');
const instructorFeedbackRouter = require('./routes/instructorFeedback.router');
const instructorScheduleRouter = require('./routes/instructorSchedule.router');
const instructorStudentListRouter = require('./routes/instructorStudentList.router');
const studentFeedbackRouter = require('./routes/studentFeedback.router');
const studentScheduleRouter = require('./routes/studentSchedule.router');
const newProgramRouter = require('./routes/newProgram.router');
const forgotPasswordRouter = require('./routes/forgotPassword.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/program', allProgramsRouter);
app.use('/api/manage', manageAccountsRouter);
app.use('/api/newProgram', newProgramRouter);
app.use('/api/instructorFeedback', instructorFeedbackRouter);
app.use('/api/instructorSchedule', instructorScheduleRouter);
app.use('/api/instructorStudentList', instructorStudentListRouter);
app.use('/api/studentFeedback', studentFeedbackRouter);
app.use('/api/studentSchedule', studentScheduleRouter);
app.use('/api/resetPassword', forgotPasswordRouter)




// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
