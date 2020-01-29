import React, { Component } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

class Books extends Component {
  constructor (props) {
    super(props)

    this.state = {
      books: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/books`
    })
      .then(response => {
        this.setState({ books: response.data.books })
      })
      .catch(console.error)
  }

  render () {
    let booksJsx = ''
    if (!this.state.books.length) {
      booksJsx = <p> Loading.. </p>
    } else {
      booksJsx = this.state.books.map(book => (
        <ListGroup.Item className="list-group-item" key={book.id} action href={`#books/${book.id}`}>
          <h4> {book.title} </h4>
          <p> by </p>
          <p> {book.author} </p>
          <p className="created-by"> created by {book.user.email} </p>
        </ListGroup.Item>
      ))
    }
    return (
      <ListGroup>
        {booksJsx}
        { this.props.user ? <Link className="btn btn-primary" to={`/bookclubs/${this.props.match.params.id}/create-book`}> Create a Book! </Link> : ''
        }
      </ListGroup>
    )
  }
}

export default Books
