import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: null
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/comments/${this.props.match.params.id}`)
      .then(res => {
        // console.log(res)
        this.setState({ comment: res.data.comment })
        // console.log('this is the this.state.comment', this.state.comment)
      })
      .catch(console.error)
  }
  handleDelete = () => {
    axios({
      url: `${apiUrl}/comments/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.props.history.push(`/books/${this.state.comment.book.id}`))
      .then(() => this.props.alert({
        heading: 'Delete:',
        message: 'Comment has been deleted',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'Oh no, something went wrong',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  render () {
    if (!this.state.comment) {
      return <Loader
        type="Triangle"
        color="#DCAE1D"
        height={100}
        width={100}
      />
    }
    console.log(this.props)
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`#/bookclubs/${this.state.comment.book.bookclub_id}`}>
            Bookclub
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`#/books/${this.state.comment.book.id}`}>
            {this.state.comment.book.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Comment</Breadcrumb.Item>
        </Breadcrumb>
        <h4> {this.state.comment.text} </h4>
        <p> Commenting on: {this.state.comment.book.title}</p>
        <p className="created-by">  created by {this.state.comment.user.email} </p>
        {this.props.user && (this.props.user.id === this.state.comment.user.id) &&
          (
            <div>
              <Link className="btn btn-primary" to={`/comments/${this.props.match.params.id}/edit`}>Edit</Link>
              <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
              <Link className="btn btn-primary" to={`/books/${this.state.comment.book.id}`}>Back to {this.state.comment.book.title}</Link>
            </div>
          )
        }
      </div>
    )
  }
}

export default Comment
