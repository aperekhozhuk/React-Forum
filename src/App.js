import React, { Component } from 'react'
import MainPage from './screens/MainPage/MainPage';
import PostPage from './screens/PostPage/PostPage';
import NewPostPage from './screens/NewPostPage/NewPostPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './screens/Login/Login'
import Register from './screens/Register/Register'
import UserProfile from './screens/UserProfile/UserProfile'

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/" render={ (props) => (
            <MainPage />
          )}>
          </Route>

          <Route exact path="/posts/new" render={ (props) => (
            <NewPostPage />
          )}>
          </Route>

          <Route path="/posts/:id([1-9][0-9]*)" render={ (props) => (
            <PostPage {...props}/>
          )}>
          </Route>

          <Route exact path="/login" render={ (props) => (
            <Login />
          )}>
          </Route>

          <Route exact path="/register" render={ (props) => (
            <Register />
          )}>
          </Route>

          <Route path="/users/:id([1-9][0-9]*)" render={ (props) => (
            <UserProfile {...props}/>
          )}>
          </Route>

          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    )
  }
}

export default App;
