import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
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
          path="/register"
          component={RegisterPage}
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
        <Route
          path="/InstructorSchedule"
          component={InstructorSchedulePage}
        />
        <Route
          path="/InstructorFeedback"
          component={InstructorFeedbackPage}
        />
        <Route
          path="/InstructorStudent"
          component={InstructorStudentPage}
        />
        <Route
          path="/StudentFeedback"
          component={StudentFeedbackPage}
        />
        <Route
          path="/StudentSchedule"
          component={StudentSchedulePage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
