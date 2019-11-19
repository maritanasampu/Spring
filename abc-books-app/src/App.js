import './App.css'
import BookEdit from './components/BookEdit'
import BooksList from './components/BooksList'
import Home from './components/Home'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={BooksList}/>
          <Route path="/books" exact={true} component={BooksList}/>
          <Route path="/books/:id" component={BookEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App
