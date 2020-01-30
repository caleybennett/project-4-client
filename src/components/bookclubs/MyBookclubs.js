import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Loader from 'react-loader-spinner'

class MyBookclub extends Component {
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
      .catch(() => this.props.alert({
        heading: 'Oh no, something went wrong',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  render () {
    let bookclubsJsx = ''
    const myBookclubs = []
    // let myBookclubs = this.state.bookclubs.filter(bookclub => bookclub.users.includes())

    // caley's stuff
    if (!this.state.bookclubs.length) {
      bookclubsJsx = <Loader
        type="Triangle"
        color="#DCAE1D"
        height={100}
        width={100}
      />
      bookclubsJsx = <p> loading </p>
    } else {
      // console.log('user: ', this.props.user)
      //   for (let x = 0; x < this.state.bookclubs[x]; x++) {
      //     for (let i = 0; i < this.state.bookclubs[x].users.length; i++) {
      //       if (this.state.bookclubs[x].users[i].id === this.props.user.id) {
      //         myBookclubs.push(this.state.bookclubs[x])
      //       }
      //     }
      //   }

      this.state.bookclubs.filter(bookclub => {
        // console.log('club: ', bookclub.users)
        // bookclubs.users.includes(this.props.user.email)
        if (bookclub.users.length > 0) {
          return bookclub.users.filter(x => {
            // console.log('user id: ', this.props.user.id)
            // console.log('x id: ', x.id)
            if (x.id === this.props.user.id) {
              myBookclubs.push(bookclub)
            }
            // if (x.id === this.props.user.id) {
            //   return x
            // }
          })
        }
      })
      // console.log('my bookclubs', myBookclubs)
      // // console.log('clubs: ', this.state.bookclubs)
      bookclubsJsx = myBookclubs.map(bookclub => (
        <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
          <h4> {bookclub.name} </h4>
        </ListGroup.Item>
      ))
    }

    return (
      <div>
        <h1> Your Bookclubs: </h1>
        {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}
        <ListGroup variant="flush">
          {bookclubsJsx}
        </ListGroup>
      </div>
    )
  }
}

export default MyBookclub
