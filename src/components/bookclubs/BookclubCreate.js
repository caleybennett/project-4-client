import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import BookclubForm from './BookclubForm.js'

class BookclubCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclub: {
        name: ''
      },
      createdId: ''
    }
  }

  handleChange = event => {
    const inputName = event.target.name
    const inputValue = event.target.value

    this.setState({ bookclub: {
      ...this.state.bookclub,
      [inputName]: inputValue
    }
    })
    console.log('input name is ' + inputName, 'input value is ' + inputValue)
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.bookclub)
    axios({
      url: `${apiUrl}/bookclubs`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        bookclub:
          this.state.bookclub
      }
    })
      .then(res => this.setState({ createdId: res.data.bookclub.id }))
      .then(() => this.props.alert({
        heading: 'YAYY🍾',
        message: 'You created a bookclub',
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
      return <Redirect to={`/bookclubs/${this.state.createdId}`} />
    }
    return (
      <div>
        <h3> Create a book! </h3>
        <BookclubForm
          bookclub={this.state.bookclub}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default BookclubCreate
