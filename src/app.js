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
import Menu from './components/menu';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

render(
  <Provider store={store}>
    <div>
      <Menu />
      <BooksList />
    </div>
  </Provider>, document.getElementById('app')
);