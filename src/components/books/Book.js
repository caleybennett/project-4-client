import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

class Book extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: null
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => {
        // console.log(res)
        this.setState({ book: res.data.book })
      })
      .catch(console.error)
  }

  handleDelete = () => {
    axios({
      url: `${apiUrl}/books/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.props.history.push('/books'))
      .then(() => this.props.alert({
        heading: 'Delete:',
        message: 'Comment has been deleted',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'This book has comments on it!',
        message: 'You can only delete books that do not have user comments!',
        variant: 'danger'
      }))
  }

  render () {
    //    // console.log('this is this.state.book' + this.state.book)
    let commentJsx = ''
    if (!this.state.book) {
      return <Loader
        type="Triangle"
        color="#DCAE1D"
        height={100}
        width={100}
      />
    }
    // // console.log(this.state.book)
    commentJsx = this.state.book.comments.map(comment => (
      <ListGroup.Item className="list-group-item" key={comment.id} action href={`#comments/${comment.id}`}>
        <p> {comment.text} </p>
        <p className="created-by"> created by: {comment.user.email} </p>
      </ListGroup.Item>
    ))
    // booksJsx = this.state.books.map(book => (
    //   <ListGroup.Item className="list-group-item" key={book.id} action href={`#books/${book.id}`}>
    //     <h4> {book.title} </h4>
    //     <p> by </p>
    //     <p> {book.author} </p>
    //     <p> owned by {book.user.email} </p>
    //   </ListGroup.Item>
    // ))
    return (
      <div>
        <h2>{this.state.book.title}</h2>
        <h5>{this.state.book.author}</h5>
        {this.props.user && (this.props.user.id === this.state.book.user.id) &&
          (
            <div>
              <Link className="btn btn-primary" to={`/books/${this.props.match.params.id}/edit`}>Edit</Link>
              {this.state.book.comments.length > 0 ? ''
                : <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
              }
            </div>
          )}
        <h6> Comments: </h6>
        {commentJsx}
        { this.props.user ? <Link className="btn btn-primary" to={`/books/${this.props.match.params.id}/create-comment`}> Create a Comment! </Link> : '' }
      </div>
    )
  }
}

export default Book
