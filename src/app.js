"use strict"

// libraries
import React from 'react';
import logger from 'redux-logger';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// actions
import {postNewBooks, deleteBooks, updateBooks} from './actions/booksActions';
import {addToCart} from './actions/cartActions';
import reducers from './reducers/index';

// components
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} />
          <Route path="/admin" component={BooksForm} />
          <Route path="/cart" component={Cart} />
      </Route>
    </Router>
  </Provider>
)

render(
  Routes, document.getElementById('app')
);