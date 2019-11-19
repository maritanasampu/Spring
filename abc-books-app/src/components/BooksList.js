import Navbar from './Navbar'
import React, { Component } from 'react'
import { Button, ButtonGroup, Container, Table } from 'reactstrap'
import { Link } from 'react-router-dom'

class BooksList extends Component {
  constructor(props) {
    super(props)
    this.state = { books: [], isLoading: true }
    this.remove = this.remove.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch('api/books')
      .then(response => response.json())
      .then(data => this.setState({ books: data, isLoading: false }))
  }

  async remove(id) {
    await fetch(`/api/book/${id}`, {
      method:  'DELETE',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      const updatedBooks = [...this.state.books].filter(i => i.id !== id)
      this.setState({ books: updatedBooks })
    })
  }

  render() {
    const { books, isLoading } = this.state

    if (isLoading) {
      return <p>Loading...</p>
    }

    const bookList = books.map(book => (
      <tr key={book.id}>
        <td>{book.id}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.isbn13}</td>
        <td>{book.comments.length}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={'/books/' + book.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    ))

    return (
      <div>
        <Navbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/books/new">Add Book</Button>
          </div>
          <h3>Books</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN-13</th>
                <th>Comments</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{bookList}</tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default BooksList
