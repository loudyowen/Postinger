import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import reducers from './reducers'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from "redux"
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)