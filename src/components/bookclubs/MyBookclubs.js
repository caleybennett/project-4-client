import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Loader from 'react-loader-spinner'
import { FaSearch } from 'react-icons/fa'

class MyBookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclubs: [],
      searchedValue: '',
      filteredEntries: []
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

  handleSearch = (event) => {
  // update the search value to what is being typed into the input box
  // once this is done run the search for DNA function
    this.setState({ searchValue: event.target.value }, () => this.searchForbookclub())
  }

  searchForbookclub = (event) => {
  // make a variable called filteredEntries
  // take the entries stored in state and filter through them
  // match the name of the entry to the search value defined above
    const filteredEntries = this.state.bookclubs.filter(entry => entry.name.toLowerCase().match(this.state.searchValue.toLowerCase()))
    // store the filteredEntries in state
    this.setState({ filteredEntries: filteredEntries })
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
    } else if (this.state.filteredEntries.length < 1) {
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
    } else {
      this.state.filteredEntries.filter(bookclub => {
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
      bookclubsJsx = myBookclubs.map(bookclub => (
        <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
          <h4> {bookclub.name} </h4>
        </ListGroup.Item>
      ))
    }

    return (
      <div>
        <h3> Your Bookclubs: </h3>
        <form className="search-bar" >
          <FaSearch />
          <input className="search" value={this.state.searchValue} onChange={this.handleSearch} type="text" placeholder="Search for Bookclub"/>
        </form>
        <br />
        {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}
        <ListGroup variant="flush">
          {bookclubsJsx}
        </ListGroup>
      </div>
    )
  }
}

export default MyBookclub
