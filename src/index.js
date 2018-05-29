import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './redux/reducers';

import App from './App';
import rootSaga from './redux/sagas';

//Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);


//Theme Colors
const theme = createMuiTheme({
  palette: {
    primary: {
     
      main: '#D8441C',
    
    },
    secondary: {
      light: '#D4D4D4',
      main: '#D4D4D4',
    
      contrastText: '#D4D4D4',
    },
 
  },
});




if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}><MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider></Provider>,
  document.getElementById('react-root'),
);
