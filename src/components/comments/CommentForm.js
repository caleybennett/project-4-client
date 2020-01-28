import React from 'react'

const CommentForm = ({ comment, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="What do you think?"
      type="text"
      value={comment.text}
      onChange={handleChange}
      name="text"
    />
    <button className="btn btn-primary" type="submit"> Submit </button>
  </form>
)

export default CommentForm
