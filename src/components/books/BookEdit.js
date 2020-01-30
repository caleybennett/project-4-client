import React, { Component } from 'react'
import BookForm from './BookForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class BookEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        title: '',
        author: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ book: res.data.book })
      })
      .catch(() => this.props.alert({
        heading: 'Oh no, something went wrong',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

handleChange= (event) => {
  // Create variables to store the input name and input value
  const inputName = event.target.name
  const inputValue = event.target.value
  // Set the state to a new object `book` that is the same as book
  // merge the new input name and value into the new book object
  // this will overwrite the other key values with the same values (cascading)
  this.setState({ book: {
    ...this.state.book,
    [inputName]: inputValue
  }
  })
}

handleSubmit = event => {
  event.preventDefault()
  axios({
    url: `${apiUrl}/books/${this.props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: {
      book: this.state.book
    }
  })
    .then(res => this.setState({ updated: true }))
    .then(() => this.props.alert({
      heading: 'YAYY🍾',
      message: 'You updated a book',
      variant: 'success'
    }))
    .catch(() => this.props.alert({
      heading: 'Oh no, something went wrong',
      message: 'Please try again',
      variant: 'danger'
    }))
}

render () {
  if (this.state.updated) {
    return <Redirect to={`/books/${this.props.match.params.id}`} />
  }

  return (
    <div>
      <h2> Update a book! </h2>
      <BookForm
        book={this.state.book}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    </div>
  )
}
}

export default BookEdit
