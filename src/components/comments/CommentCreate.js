import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import CommentForm from './CommentForm.js'
import { Redirect } from 'react-router-dom'

class CommentCreate extends Component {
  constructor (props) {
    super(props)
    // console.log(props)
    this.state = {
      comment: {
        text: '',
        user_id: '',
        book_id: ''
      },
      createdId: ''
    }
  }

  handleChange= (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    // console.log(this.props)
    this.setState({ comment: {
      ...this.state.comment,
      [inputName]: inputValue,
      user_id: this.props.user.id,
      book_id: this.props.match.params.id
    }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        comment:
          this.state.comment
      }
    })
      .then(res => this.setState({ createdId: res.data.comment.id }))
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
      return <Redirect to={`/books/${this.props.match.params.id}`}/>
    }
    return (
      <CommentForm
        comment={this.state.comment}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default CommentCreate
