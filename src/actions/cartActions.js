"use strict"

// CART ACTIONS
export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  }
}

// DELETE ITEM
export function deleteFromCart(cart) {
  return {
    type: "DELETE_FROM_CART",
    payload: cart
  }
}