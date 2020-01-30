import React, { Component } from 'react'
import MainPage from './screens/MainPage/MainPage';
import PostPage from './screens/PostPage/PostPage';
import NewPostPage from './screens/NewPostPage/NewPostPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage}></Route>
            <Route exact path="/posts/new" component={NewPostPage}></Route>
            <Route path="/posts/:id([1-9][0-9]*)" component={PostPage}></Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
