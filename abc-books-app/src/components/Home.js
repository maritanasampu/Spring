import '../App.css'
import Navbar from './Navbar'
import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Container fluid>
          <Button color="link"><Link to="/books">Manage Books</Link></Button>
        </Container>
      </div>
    )
  }
}

export default Home
