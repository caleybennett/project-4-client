import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Loader from 'react-loader-spinner'
import { FaSearch } from 'react-icons/fa'

class Bookclub extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bookclubs: [],
      isLoaded: false,
      searchedValue: '',
      filteredEntries: []
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
  if (!this.state.isLoaded) {
    bookclubsJsx = <Loader
      type="Triangle"
      color="#DCAE1D"
      height={100}
      width={100}
    />
  } else if (this.state.filteredEntries < 1) {
    bookclubsJsx = this.state.bookclubs.map(bookclub => (
      <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
        <h4> {bookclub.name} </h4>
      </ListGroup.Item>
    ))
  } else {
    bookclubsJsx = this.state.filteredEntries.map(bookclub =>
      <ListGroup.Item className="list-group-item" key={bookclub.id} action href={`#bookclubs/${bookclub.id}`}>
        <h4> {bookclub.name} </h4>
      </ListGroup.Item>
    )
  }

  return (
    <div>
      <form className="search-bar" >
        <FaSearch />
        <input className="search" value={this.state.searchValue} onChange={this.handleSearch} type="text" placeholder="Search for Bookclub"/>
      </form>
      <h1>booknook</h1>
      <br />
      <ListGroup variant="flush">
        {this.props.user ? '' : <h5> In order to join a bookclub please sign in! </h5>}
        {bookclubsJsx}
      </ListGroup>
    </div>
  )
}
}

export default Bookclub
