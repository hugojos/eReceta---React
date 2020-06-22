import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { Provider } from 'react-redux'
import generateStore from './redux/store'

import axios from 'axios';
import './index.css';
import App from './App';

import { unregister } from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2492c6',
      contrastText: 'white'
    }
  }
})

const store = generateStore()

axios.defaults.headers.common.version = window.properties.version;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
		  <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
