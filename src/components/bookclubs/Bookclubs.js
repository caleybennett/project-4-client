import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
// import Loader from 'react-loader-spinner'

class Bookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclubs: []
    }
  }
  // {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}

  componentDidMount () {
    axios({
      url: `${apiUrl}/bookclubs`
    })
      .then(res => {
        this.setState({ bookclubs: res.data.bookclubs })
      })
      .catch(console.error)
  }

  render () {
    let bookclubsJsx = ''
    if (!this.state.bookclubs.length) {
      bookclubsJsx = <p> loading </p>
      // bookclubsJsx = <Loader
      //   type="Triangle"
      //   color="#DCAE1D"
      //   height={100}
      //   width={100}
      // />
    } else {
      bookclubsJsx = this.state.bookclubs.map(bookclub => (
        <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
          <h4> {bookclub.name} </h4>
        </ListGroup.Item>
      ))
    }

    return (
      <div>
        <h1> Welcome to booknook</h1>
        <ListGroup variant="flush">
          {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}
          {bookclubsJsx}
        </ListGroup>
      </div>
    )
  }
}

export default Bookclub
