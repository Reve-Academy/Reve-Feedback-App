import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

//import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Home_AllProgramsPage from './components/Home/AllProgramsPage/Home_AllProgramsPage';
import ManageAccountsPage from './components/Home/ManageAccountsPage/ManageAccountsPage';
import NewProgramPage from './components/Home/NewProgramPage/NewProgramPage';
import InstructorStudentPage from './components/InstructorProgramViews/InstructorStudentPage/InstructorStudentPage';
import InstructorFeedbackPage from './components/InstructorProgramViews/InstructorFeedbackPage/InstructorFeedBackPage';
import InstructorSchedulePage from './components/InstructorProgramViews/InstructorSchedulePage/InstructorSchedulePage';
import StudentFeedbackPage from './components/StudentViews/StudentFeedbackPage';
import StudentSchedulePage from './components/StudentViews/StudentSchedulePage';
import ResetPasswordPage from './components/LoginPage/ResetPasswordPage'



import './styles/main.css';

const App = () => (
  <div>
    {/* <Header title="Project Base" /> */}
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register/:token"
          component={RegisterPage}
        />
        <Route
          path="/resetPassword/:token"
          component={ResetPasswordPage}
        />
        <Route
          path="/user"
          component={Home_AllProgramsPage}
        />
        <Route
          path="/manageAccounts"
          component={ManageAccountsPage}
        />
        <Route
          path="/newProgram"
          component={NewProgramPage}
        />
        {/* <Route
          path="/InstructorSchedule"
          component={InstructorSchedulePage}
        /> */}
        <Route
          path="/InstructorFeedback/:program_id/:program_name"
          component={InstructorFeedbackPage}
        />
        <Route
          path="/InstructorStudent/:program_id/:program_name"
          component={InstructorStudentPage}
        />
        <Route
          path="/StudentFeedback/:program_id"
          component={StudentFeedbackPage}
        />
        <Route
          path="/StudentSchedule/:program_id"
          component={StudentSchedulePage}
        />
        <Route
          path="/InstructorSchedule/:program_id/:program_name"
          component={InstructorSchedulePage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
