import React from 'react';
import ReactDOM from 'react-dom/client';
import thunk from 'redux-thunk'
import reducers from './reducers'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from "redux"
import App from './App';
import { CookiesProvider } from "react-cookie";

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
)