"use strict"

// CART ACTIONS
export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  }
}