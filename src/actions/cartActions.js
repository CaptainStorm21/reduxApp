"use strict"
import axios from 'axios';

export function addToCart(cart) {
  return function(dispatch) {
    axios.post("/api/cart", cart)
      .then(function(response) {
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err) {
        dispatch({type:"ADD_TO_CART_REJECTED", msg:'error when adding to cart'})
      })
  }
}

export function updateCart(_id, unit, cart) {
  const currentBookToUpdate = cart;
  // Determine index of book to update
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book) {
      return book._id === _id;
    }
  )

  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity:currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
  ...currentBookToUpdate.slice(indexToUpdate + 1)];
  return function(dispatch) {
    axios.post("/api/cart", cartUpdate)
      .then(function(response) {
        dispatch({type:"UPDATE_CART", payload:response.data})
      })
      .catch(function(err) {
        dispatch({type:"UPDATE_CART_REJECTED", msg:'error when updating to cart'})
      })
  }
}

export function deleteFromCart(cart) {
  return {
    type: "DELETE_FROM_CART",
    payload: cart
  }
}