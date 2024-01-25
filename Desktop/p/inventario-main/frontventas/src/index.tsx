import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

import { Provider } from "react-redux";
import store from "./store/store";

import { BrowserRouter as Router } from "react-router-dom";
import { AppRoute } from "./routes/route";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppRoute />
      </Router>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
