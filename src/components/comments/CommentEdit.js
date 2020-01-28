import React, { Component } from 'react'
import CommentForm from './CommentForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class CommentEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: {
        text: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/comments/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ comment: res.data.comment })
      })
      .then(() => this.props.alert({
        heading: 'EDIT',
        message: 'please edit your comment!',
        variant: 'success'
      }))
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
  this.setState({ comment: {
    ...this.state.comment,
    [inputName]: inputValue
  }
  })
}

handleSubmit = event => {
  event.preventDefault()
  axios({
    url: `${apiUrl}/comments/${this.props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: {
      comment: this.state.comment
    }
  })
    .then(res => this.setState({ updated: true }))
    .then(() => this.props.alert({
      heading: 'YAYY🍾',
      message: 'You updated your comment!',
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
    return <Redirect to={`/comments/${this.props.match.params.id}`} />
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

export default CommentEdit
