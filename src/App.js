import React, { Component } from 'react';
import './App.css';
import TodoApp from './components/TodoApp';
import Header from './components/Header';
import Form from './components/Form';

let currentDate = new Date()
let date = currentDate.getDate()
let month = currentDate.getMonth()
let year = currentDate.getFullYear()
const MyDateString = ('0' + date).slice(-2) + '/'
  + ('0' + (month + 1)).slice(-2) + '/'
  + year;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      items: [],
      error: '',
      date: MyDateString,
      //done: false,
      edit: {},
      isEditing: false,
      complete: false,
    }
  }

  // handleComplete = (idx) => {
  //   console.log('object', this.state.items)
  //   const newState = { ...this.state.items }

  //   // this.setState({ items: newState });
  //   // localStorage.setItem('items', JSON.stringify(newState))
  // }

  handleEdit = (id) => {
    const items = this.state.items.map(item => item.id === id ? { ...item, isEditing: true } : item)

    this.setState({
      items
    })

    localStorage.setItem('items', JSON.stringify(items))
  }

  editItem = (editedItem) => {
    const items = this.state.items.map(item => item.id === editedItem.id ? editedItem : item)

    this.setState({
      items
    })

    localStorage.setItem('items', JSON.stringify(items))
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), text: this.state.value.trim(), date: this.state.date, complete: false }
    const pushedItem = [...this.state.items, newItem]

    if (newItem.text.length >= 5) {
      this.setState({
        items: pushedItem,
        value: '',
        error: ''
      })

      localStorage.setItem('items', JSON.stringify(pushedItem))

    } else {
      this.setState({
        items: [...this.state.items],
        value: '',
        error: 'Please, your todo needs to consist least 5 words!'
      })
    }
  }



  handleOnDelete = (item) => {
    const items = this.state.items.filter(i => i.id !== item.id)
    this.setState({
      items,
    })

    localStorage.setItem('items', JSON.stringify(items))
  }

  handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value


    this.setState({
      value: value
    })
  }

  handleDeleteAll = () => {
    let { items } = this.state
    items = []
    this.setState({
      items: items
    })

    localStorage.setItem('items', JSON.stringify(items))
  }

  // handleChecked = (id) => {
  //   const items = this.state.items.map(item => item.id === id ? { ...item, checked: true } : item)
  // }


  render() {
    const title = '{ TODO }';
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || []

    return (
      <div className="App">
        <Header title={title} />

        <Form
          submit={this.handleOnSubmit}
          value={this.state.value}
          change={this.handleOnChange}
        />

        {this.state.error ? <p className="error">{this.state.error}</p> : null}

        {localStorageItems.length !== 0 ? <TodoApp
          items={localStorageItems}
          value={this.state.value}
          change={this.handleOnChange}
          submit={this.handleOnSubmit}
          delete={this.handleOnDelete}
          checked={this.handleItemClick}
          completed={this.state.done}
          edit={this.handleEdit}
          isEditing={this.state.isEditing}
          editItem={this.editItem}
          complete={this.handleComplete}
        /> : null}

        {localStorageItems.length > 0 ? <button className="delete-all" onClick={this.handleDeleteAll}>Delete All</button> : null}
      </div>
    );
  }
}

export default App;
