import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Books from '../books/Books'
import Book from '../books/Book'
import BookCreate from '../books/BookCreate'
import BookEdit from '../books/BookEdit'
import Comment from '../comments/Comment'
import CommentCreate from '../comments/CommentCreate'
import CommentEdit from '../comments/CommentEdit'
import Bookclubs from '../bookclubs/Bookclubs'
import Bookclub from '../bookclubs/Bookclub'
import BookclubCreate from '../bookclubs/BookclubCreate'
import MyBookclubs from '../bookclubs/MyBookclubs'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Bookclubs
              user={user}
              alert={this.alert} />
          )} />
          <Route exact path='/books' render={(props) => (
            <Books user={user} match={props.match} />
          )} />
          <Route exact path ='/books/:id' render={(props) => (
            <Book user={user} match={props.match} history={props.history} alert={this.alert} />
          )} />
          <Route exact path ='/comments/:id' render={(props) => (
            <Comment user={user} match={props.match} history={props.history} alert={this.alert} />
          )} />
          <Route exact path ='/bookclubs/:id' render={(props) => (
            <Bookclub user={user} match={props.match} history={props.history} alert={this.alert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/my-bookclubs'
            render={(props) => (
              <MyBookclubs alert={this.alert} user={user} match={props.match} />
            )} />
          <AuthenticatedRoute user={user} exact path='/bookclubs/bookclubs/:id/create-book'
            render={(props) => (
              <BookCreate alert={this.alert} user={user} match={props.match} />
            )} />
          <AuthenticatedRoute user={user} exact path='/create-bookclub'
            render={(props) => (
              <BookclubCreate alert={this.alert} user={user} match={props.match} />
            )} />
          <AuthenticatedRoute user={user} exact path='/books/:id/create-comment'
            render={(props) => (
              <CommentCreate alert={this.alert} user={user} match={props.match} history={props.history}/>
            )} />
          <AuthenticatedRoute user={user} exact path='/books/:id/edit'
            render={({ match }) => (
              <BookEdit match={match} alert={this.alert} user={user} />
            )} />
          <AuthenticatedRoute user={user} exact path='/comments/:id/edit'
            render={({ match }) => (
              <CommentEdit match={match} alert={this.alert} user={user} />
            )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser}/>
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
