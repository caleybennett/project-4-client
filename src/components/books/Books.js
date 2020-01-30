import React, { Component } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
// import Loader from 'react-loader-spinner'

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
      // booksJsx = <Loader
      //   type="Triangle"
      //   color="#DCAE1D"
      //   height={100}
      //   width={100}
      // />
      booksJsx = <p> loading </p>
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
      <ListGroup className="list-group-flush">
        {booksJsx}
        { this.props.user ? <Link className="btn btn-primary" to={`/bookclubs/${this.props.match.params.id}/create-book`}> Create a Book! </Link> : ''
        }
      </ListGroup>
    )
  }
}

export default Books
