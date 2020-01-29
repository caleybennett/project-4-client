import React from 'react'

const BookclubForm = ({ bookclub, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Name"
      type="text"
      value={bookclub.name}
      onChange={handleChange}
      name="name"
    />
    <button type="submit" className="btn btn-primary"> Submit </button>
  </form>
)

export default BookclubForm
