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

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render(
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
);

// store.dispatch(postNewBooks(

// ));

store.dispatch(updateBooks({
  id: 2,
  title: 'NEW title for book no.2'
}));

store.dispatch(addToCart([{id: 3 }]));