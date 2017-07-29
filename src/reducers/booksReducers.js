// BOOKS REDUCERS
export function booksReducers(state={
  
  books:
    [{
      _id: 1,
      title: 'Sub-par Book',
      description: '\"The best medium book around\"',
      price: 23.97
    },
    {
      _id: 2,
      title: 'Great Book',
      description: '\"I loved this book\"',
      price: 8.28
    }]
  }, action) {
  switch(action.type) {
    
    case "POST_BOOK":
      return {books:[...state.books, ...action.payload]};
      break;

    case "DELETE_BOOK":
      // first create a copy of the current array of books
      const currentBookToDelete = [...state.books];
      // Determine which index in books array to delete
      const indexToDelete = currentBookToDelete.findIndex(
        function(book) {
          return book._id == action.payload;
        }
      )

      return {books:[...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)]};
      break;
  
    case "UPDATE_BOOK":
      // create a copy of the books array
      const currentBookToUpdate = [...state.books];
      // Determine index of book to update
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book._id === action.payload._id;
        }
      )

      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }

      return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
      ...currentBookToUpdate.slice(indexToUpdate + 1)]}
      break;

    case "GET_BOOKS":
      return {...state, books:[...state.books]}
  }
  return state;
}