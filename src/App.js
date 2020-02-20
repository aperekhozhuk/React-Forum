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
      userLoaded : false
    }

    this.setUser = this.setUser.bind(this)
    this.unSetUser = this.unSetUser.bind(this)

    const headers = {
      'Content-Type': 'application/json',
    }
    const data = {'access-token': this.state.token }
    axios.post('http://localhost:5000/verify-token', data, {
      headers: headers,
    })
    .then(res => this.setState({
      username: res.data.username,
      userLoaded: true
    }))
    .catch( error =>
      this.setState({userLoaded: true})
    );
  }

  setUser(username) {
    this.setState({
      username: username,
      userLoaded: true
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
              <NewPostPage history={props.history}/>
            )}>
            </Route>

            <Route path="/posts/:id([1-9][0-9]*)" render={ (props) => (
              <PostPage {...props}/>
            )}>
            </Route>

            <Route exact path="/login" render={ (props) => (
              <Login history={props.history} setUser={this.setUser}/>
            )}>
            </Route>

            <Route exact path="/register" render={ (props) => (
              <Register history={props.history}/>
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
    )
  }
}

export default App;
