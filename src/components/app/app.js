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
  };

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
    };

    return [
      ...arr.slice(0,idx),
      newItem,
      ...arr.slice(idx+1)
    ];

  }

  deleteItem = (id) => {
    this.setState(({todoData})=> {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
          ...todoData.slice(0,idx),
          ...todoData.slice(idx+1)
        ];

        return {
          todoData: newArray
        };
    });
  };

  addItem = (text) => {
    this.setState(({todoData}) => {
        return {
          todoData: [...todoData, this.createTodoItem(text)]
        };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData,id,"important")
      };
    });
  };


  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData,id,"done")
      };
    });
  };


  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList
          todos = {todoData}
          onDeleted = { this.deleteItem } 
          onToggleImportant = {this.onToggleImportant}
          onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm onAddItem = {this.addItem} />
      </div>
    );
  };

}