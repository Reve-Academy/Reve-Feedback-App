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
import Home_AllProgramsPage from './components/Home/Home_AllProgramsPage';
import ManageAccountsPage from './components/Home/ManageAccountsPage';
import NewProgramPage from './components/Home/NewProgramPage';


import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
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
          path="/newProgram"
          component={NewProgramPage}
        />
        <Route
          path="/newProgram"
          component={NewProgramPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
