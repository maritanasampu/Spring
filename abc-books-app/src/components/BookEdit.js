import Navbar from './Navbar'
import React, { Component } from 'react'
import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

class BookEdit extends Component {
  emptyItem = {
    title:  '',
    author: '',
    isbn13: ''
  };

  constructor(props) {
    super(props)
    this.state = {
      item: this.emptyItem
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const book = await (await fetch(`/api/books/${this.props.match.params.id}`)).json()
      this.setState({ item: book })
    }
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    const item = { ...this.state.item }
    item[name] = value
    this.setState({ item })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { item } = this.state
    console.log('JSON.stringify(item)', JSON.stringify(item))

    await fetch(`/api/book`, {
      method:  (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    this.props.history.push('/')
  }

  render() {
    const { item } = this.state
    const title = <h2>{item.id ? 'Edit Book' : 'Add Book'}</h2>

    return (
      <div>
        <Navbar/>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={item.title || ''}
                onChange={this.handleChange}
                autoComplete="title"/>
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={item.author || ''}
                onChange={this.handleChange}
                autoComplete="author"/>
            </FormGroup>
            <FormGroup>
              <Label for="isbn13">ISBN-13</Label>
              <Input
                type="text"
                name="isbn13"
                id="isbn13"
                value={item.isbn13 || ''}
                onChange={this.handleChange}
                autoComplete="isbn13"/>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    )
  }
}

export default withRouter(BookEdit)
