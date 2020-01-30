import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Loader from 'react-loader-spinner'

class Bookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclubs: [],
      isLoaded: false
    }
  }
  // {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}

  componentDidMount () {
    axios({
      url: `${apiUrl}/bookclubs`
    })
      .then(res => {
        this.setState({ bookclubs: res.data.bookclubs, isLoaded: true })
      })
      .catch(() => this.props.alert({
        heading: 'Oh no, something went wrong',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  render () {
    let bookclubsJsx = ''
    if (!this.state.isLoaded) {
      bookclubsJsx = <Loader
        type="Triangle"
        color="#DCAE1D"
        height={100}
        width={100}
      />
    } else {
      bookclubsJsx = this.state.bookclubs.map(bookclub => (
        <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
          <h4> {bookclub.name} </h4>
        </ListGroup.Item>
      ))
    }

    return (
      <div>
        <h1>booknook</h1>
        <ListGroup variant="flush">
          {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}
          {bookclubsJsx}
        </ListGroup>
      </div>
    )
  }
}

export default Bookclub
