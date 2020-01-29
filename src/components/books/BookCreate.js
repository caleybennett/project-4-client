import React, { Component } from 'react'
import BookForm from './BookForm.js'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class BookCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: '',
        user_id: '',
        bookclub_id: ''
      },
      createdId: ''
    }
  }

handleChange= (event) => {
  // Create variables to store the input name and input value
  const inputName = event.target.name
  const inputValue = event.target.value
  console.log(this.props.user)
  console.log('the this.props.match.params.id', this.props.match.params.id)
  // Set the state to a new object `book` that is the same as book
  // merge the new input name and value into the new book object
  // this will overwrite the other key values with the same values (cascading)
  this.setState({ book: {
    ...this.state.book,
    [inputName]: inputValue,
    user_id: this.props.user.id,
    bookclub_id: this.props.match.params.id
  }
  })
}

handleSubmit = event => {
  event.preventDefault()
  axios({
    url: `${apiUrl}/books`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: {
      book:
        this.state.book
    }
  })
    .then(res => this.setState({ createdId: res.data.book.id }))
    .then(() => this.props.alert({
      heading: 'YAYY🍾',
      message: 'You created a book',
      variant: 'success'
    }))
    .catch(() => this.props.alert({
      heading: 'Oh no, something went wrong',
      message: 'Please try again',
      variant: 'danger'
    }))
}

render () {
  if (this.state.createdId) {
    return <Redirect to={`/books/${this.state.createdId}`} />
  }
  return (
    <BookForm
      book={this.state.book}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
    />
  )
}
}

export default BookCreate
