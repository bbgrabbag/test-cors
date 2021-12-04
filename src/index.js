import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import * as atatus from 'atatus-spa';
atatus.config('4f3d1b1955a74da8b75f307a5ef19359').install();

// let express = require('express');
// let app = express();

// let cors = require('cors');

// let allowedOrigins = ['http://localhost:3000', 'https://amazonaws.com'];

// app.use(cors(
//    {
//    origin: (origin, callback) => {
//      if(!origin) return callback(null, true);
//      if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//        let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//        return callback(new Error(message ), false);
//      }
//      return callback(null, true);
//    }
//   }

// ));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
