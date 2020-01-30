import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

class Bookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclub: null
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/bookclubs/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ bookclub: res.data.bookclub })
        console.log(this.state.bookclub)
      })
      .catch(console.error)
  }
  handleClick = () => {
    axios({
      url: `${apiUrl}/bookclub_members`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        bookclub_member: {
          user_id: this.props.user.id,
          bookclub_id: this.state.bookclub.id
        }
      }
    })
      .then(() => this.props.alert({
        heading: 'YAYY🍾',
        message: 'You joined a book club!',
        variant: 'success'
      }))
      .catch(() => this.props.alert({
        heading: 'Oh no, something went wrong',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  // handleDelete = () => {
  //   axios({
  //     url: `${apiUrl}/bookclubs/${this.props.match.params.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //   })
  //     .then(() => this.props.history.push('/books'))
  //     .then(() => this.props.alert({
  //       heading: 'Delete:',
  //       message: 'Comment has been deleted',
  //       variant: 'success'
  //     }))
  //     .catch(() => this.props.alert({
  //       heading: 'Oh no, something went wrong',
  //       message: 'Please try again',
  //       variant: 'danger'
  //     }))
  // }
  // <p className="created-by"> created by {book.user.email} </p>
  //   && (this.props.user.id === this.state.bookclub.user.id)
  // <h4> {book.title} </h4>
  // <p> by </p>
  // <p> {book.author} </p>
  // bookclubsJsx = this.state.bookclubs.map(bookclub => (
  //   <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
  //     <h4> {bookclub.name} </h4>
  //   </ListGroup.Item>
  // ))
  render () {
    let booksJsx = ''
    let createBook = ''
    if (this.state.bookclub === null) {
      booksJsx = <Loader
        type="Triangle"
        color="#DCAE1D"
        height={100}
        width={100}
      />
      // booksJsx = <p> loading </p>
    } else {
      booksJsx =
        this.state.bookclub.books.map(book => (
          <ListGroup.Item className="list-group-item" key={book.id} action href={`#books/${book.id}`}>
            <h4> {book.title} </h4>
            <p> by </p>
            <p> {book.author} </p>
          </ListGroup.Item>
        ))
      if (this.props.user) {
        if (this.state.bookclub.users.find(user => user.id === this.props.user.id)) {
          createBook = <Link className="btn btn-primary" to={`bookclubs/${this.props.match.params.id}/create-book`}> Create a Book! </Link>
        } else {
          createBook =
          <div>
            <h5> Join the book club to create a book! </h5>
            <button className="btn btn-success" onClick={this.handleClick}> Join </button>
          </div>
        }
      }
    }
    return (
      <div>
        <h3 className="bookclub-title"> {this.state.bookclub ? this.state.bookclub.name : ''} </h3>
        <ListGroup className="container-grid">
          {booksJsx}
        </ListGroup>
        {createBook}
      </div>
    )
  }
}

export default Bookclub
