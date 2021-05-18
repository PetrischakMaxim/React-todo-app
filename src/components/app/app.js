import React, {Component} from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData : [
      this.createTodoItem('Drink'),
      this.createTodoItem('Sleep'),
      this.createTodoItem('Eat')
    ],
    term:'',
    filter: 'all'
  }

  createTodoItem (label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    }
  }

  toggleProperty = (arr,id,propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem =  {
      ...oldItem,
      [propName]: !oldItem[propName]
    }

    return [
      ...arr.slice(0,idx),
      newItem,
      ...arr.slice(idx+1)
    ]

  }

  deleteItem = (id) => {
    this.setState(({todoData})=> {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
          ...todoData.slice(0,idx),
          ...todoData.slice(idx+1)
        ]

        return {
          todoData: newArray
        }
    })
  }

  addItem = (text) => {
    this.setState(({todoData}) => {
        return {
          todoData: [...todoData, this.createTodoItem(text)]
        }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData,id,"important")
      }
    })
  }


  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData,id,"done")
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  searchItem = (items,term) => {
    if(!term.length) {
      return items;
    } 

    return items.filter(({label}) => 
      label.toLowerCase()
      .indexOf(term.toLowerCase()) > -1)
  }

  filterItem = (items,filter) => {
    switch(filter){
      case 'all': return items;
      case 'active': return items.filter(item => !item.done);
      case 'done': return items.filter(item => item.done);
      default: return items;
    }
  }

  render() {
    const {todoData,term, filter} = this.state;
    
    const visibleItems = this.filterItem(this.searchItem(todoData,term),filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filterItem={filter} onFilterChange={this.onFilterChange} />
        </div>
  
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem} 
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAddItem={this.addItem} />
      </div>
    )
  }
}