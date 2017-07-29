"use strict"

import React from 'react';
import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {postNewBooks, deleteBooks, updateBooks} from './actions/booksActions';
import {addToCart} from './actions/cartActions';
import BooksList from './components/pages/booksList.js';
import reducers from './reducers/index';
 
// STEP 1 create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

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
    price: 9.28
  },
  {
    id: 3,
    title: 'Baby Island',
    description: 'It\'s my Favorite Book Ever',
    price: 1.29
  }]
));

store.dispatch(updateBooks({
  id: 2,
  title: 'NEW title for book no.2'
}))

store.dispatch(deleteBooks({id: 2}));

store.dispatch(addToCart([{id: 1 }]));