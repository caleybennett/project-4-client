import React from 'react'

const BookForm = ({ book, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Title"
      type="text"
      value={book.title}
      onChange={handleChange}
      name="title"
    />
    <input
      placeholder="Author"
      type="text"
      value={book.author}
      onChange={handleChange}
      name="author"
    />
    <button type="submit"> Submit </button>
  </form>
)

export default BookForm
