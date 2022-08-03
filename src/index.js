import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import GlobalStyle from './components/GlobalStyle';

import thunk from "redux-thunk" 
import { createStore, applyMiddleware } from 'redux';
        

import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReduce'

const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStore(rootReducer, applyMiddleware(thunk));


root.render(
    <Provider store={reduxStore}>
        <GlobalStyle>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalStyle>
    </Provider>
);

reportWebVitals();

