import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'

class Bookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclubs: []
    }
  }

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
      bookclubsJsx = <p> here are some bookclubs... </p>
    } else {
      bookclubsJsx = this.state.bookclubs.map(bookclub => (
        <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
          <h4> {bookclub.name} </h4>
        </ListGroup.Item>
      ))
    }

    return (
      <div>
        {bookclubsJsx}
      </div>
    )
  }
}

export default Bookclub
