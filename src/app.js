"use strict"

// import the store functions
import {applyMiddleware, createStore} from 'redux';

import React from 'react';

import {render} from 'react-dom';

import {Provider} from 'react-redux';

// import the redux-logger
import logger from 'redux-logger';

// import the reducers
import reducers from './reducers/index';

// CART ACTIONS
import {addToCart} from './actions/cartActions';

// BOOK ACTIONS
import {postNewBooks, deleteBooks, updateBooks} from './actions/booksActions';

 
// STEP 1 create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList.js';

render(
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
);

store.dispatch(postNewBooks(
  [{
    id: 1,
    title: 'book title no. 1',
    description: 'a description of a fancy book',
    price: 3.97
  },
  {
    id: 2,
    title: 'book title no. 2',
    description: 'a description of a lame book',
    price: 928
  }]
));

store.dispatch(updateBooks({
  id: 2,
  title: 'NEW title for book no.2'
}))

store.dispatch(deleteBooks({id: 2}));

store.dispatch(addToCart([{id: 1 }]));