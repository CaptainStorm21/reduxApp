"use strict"

// axios allows us to return functions with http responses
import axios from 'axios';

export function postNewBooks(book) {
  return function(dispatch) {
    axios.post("/books", book)
      .then(function(response) {
        dispatch({type: "POST_BOOK", payload:response.data});
      })
      .catch(function(err){
        dispatch({type:"POST_BOOK REJECTED", payload:"there was an error while posting a new book"});
      })
  }
}

export function getBooks() {
  return function(dispatch) {
    axios.get("/books")
      .then(function(response) {
        dispatch({type: "GET_BOOKS", payload: response.data});
      })
      .catch(function(err) {
        dispatch({type:"GET_BOOKS_REJECTED", payload:"there was an error while getting books"});
      })
  }
}

export function deleteBooks(_id) {
  return function(dispatch) {
    axios.delete("/books/" + _id)
      .then(function(response) {
        dispatch({type: "DELETE_BOOK", payload:_id})
      })
      .catch(function(err) {
        dispatch({type: "DELETE_BOOK_REJECTED", payload: "there was and error while deleting a book"});
      })
  }
}


export function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}
