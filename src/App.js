import React, { Component, Fragment } from 'react'
import MainPage from './screens/MainPage/MainPage';
import PostPage from './screens/PostPage/PostPage';
import NewPostPage from './screens/NewPostPage/NewPostPage';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import UserProfile from './screens/UserProfile/UserProfile'
import axios from 'axios'
import Cookies from 'js-cookie'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: Cookies.get('access-token'),
      username : '',
      userLoaded : false,
      loading: true
    }
    // Let's start render page at least after some time
    // It get rid us of 25th frame effect while we send authentication request
    // for future page rendering, based on his response
    setTimeout(
      () => { this.setState({loading: false}) }, 1700
    );
    this.setUser = this.setUser.bind(this)
    this.unSetUser = this.unSetUser.bind(this)

    const data = {'access-token': this.state.token }
    axios.post(`${window.API_URL}/verify-token`, data, {
      headers: window.API_HEADERS
    })
    .then(res => this.setState({
      username: res.data.username,
      userLoaded: true
    }))
    .catch( error =>
      this.setState({userLoaded: true})
    );
  }

  setUser(payload) {
    this.setState({
      username: payload['username'],
      userLoaded: true,
      token: payload['access-token']
    })
  }

  unSetUser() {
    Cookies.remove('access-token')
    this.setState({
      token: '',
      username : ''
    })
  }

  render() {
    return (
      <Fragment>
        {/* Let's start render page only after checking user authentication
        It get rid us of useless re-rendering and blinking */}
        { (this.state.userLoaded && !this.state.loading)? (
          <BrowserRouter>
            <div className="fixed-top">
              <Header />
              <Navbar
                username={this.state.username}
                userLoaded={this.state.userLoaded}
                unSetUser={this.unSetUser}
              />
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" render={ (props) => (
                  <MainPage />
                )}>
                </Route>

                <Route exact path="/posts/new" render={ (props) => (
                  <NewPostPage
                    history={props.history}
                    username={this.state.username}
                    userLoaded={this.state.userLoaded}
                    token={this.state.token}
                  />
                )}>
                </Route>

                <Route path="/posts/:id([1-9][0-9]*)" render={ (props) => (
                  <PostPage {...props}/>
                )}>
                </Route>

                <Route exact path="/login" render={ (props) => (
                  <Login
                    history={props.history}
                    setUser={this.setUser}
                    username={this.state.username}
                    userLoaded={this.state.userLoaded}
                  />
                )}>
                </Route>

                <Route exact path="/register" render={ (props) => (
                  <Register
                    history={props.history}
                    username={this.state.username}
                    userLoaded={this.state.userLoaded}
                  />
                )}>
                </Route>

                <Route path="/users/:id([1-9][0-9]*)" render={ (props) => (
                  <UserProfile {...props}/>
                )}>
                </Route>

                <Redirect to="/" />
              </Switch>
            </div>
            <Footer />
          </BrowserRouter>
        ) : (
          <div className="container">
            <div className="spinner spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

export default App;
