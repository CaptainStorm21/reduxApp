"use strict"

import axios from 'axios';

export function postNewBooks(book) {
  return function(dispatch){
    axios.post("/books", book)
      .then (function(response) {
        dispatch({type: "POST_BOOK", payload:response.data});
      })
      .catch(function(err){
        dispatch({type:"POST_BOOK REJECTED", payload:"there was an error while posting a new book"});
      })

  }
}

export function deleteBooks(_id) {
  return {
    type: "DELETE_BOOK",
    payload: _id
  }
}

export function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

export function getBooks() {
  return {
    type:"GET_BOOKS"
  }
}