import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { changeField, changeBool } from './modules/auth';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import rootReducer from './modules';
import App from './App';
import * as firebase from 'firebase';

const jwtDecode = require('jwt-decode');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const store = createStore(rootReducer, composeWithDevTools());

const pushUserData = (k, v) => {
  store.dispatch(changeField({ form: 'userData', key: k, value: v }));
};

function loadUser() {
  if (localStorage.token) {
    const jwtToken = jwtDecode(localStorage.token);
    pushUserData('userToken', localStorage.token);
    pushUserData('uid', jwtToken.user.uid);
    pushUserData('nickname', jwtToken.user.nickname);
    pushUserData('age', jwtToken.user.age);
    pushUserData('gender', jwtToken.user.gender);
    pushUserData('image', jwtToken.user.image);
    store.dispatch(changeBool({ key: 'isLoggedIn', value: true }));
  } else {
    store.dispatch(changeBool({ key: 'isLoggedIn', value: false }));
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
