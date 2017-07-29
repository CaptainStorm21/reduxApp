"use strict"

export function updateCart(_id, unit) {
  return {
    type: "UPDATE_CART",
    _id: _id,
    unit: unit
  }
}

export function addToCart(book) {
  return {
    type: "ADD_TO_CART",
    payload: book
  }
}

export function deleteFromCart(cart) {
  return {
    type: "DELETE_FROM_CART",
    payload: cart
  }
}