"use strict"

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
  return {
    type: "UPDATE_CART",
    payload: cartUpdate
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

export function getCart(cart) {

}