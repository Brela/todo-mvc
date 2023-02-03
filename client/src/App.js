import React, { Component } from 'react';
import logo from './images/scroll.png';
import './App.css';

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    fetch('http://localhost:2100/routes/todos.js')
      .then(res => res.json())
      .then(data => this.setState({ todos: data }))
      .catch(error => console.error(error));
  }

  async deleteTodo(id) {
    try {
      const response = await fetch(`/todos/deleteTodo`, {
        method: 'delete',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: id,
        }),
      });
      const data = await response.json();
      console.log(data);
      this.setState({ todos: this.state.todos.filter(todo => todo._id !== id) });
    } catch (err) {
      console.log(err);
    }
  }

  async markComplete(id) {
    try {
      const response = await fetch(`/todos/markComplete`, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: id,
        }),
      });
      const data = await response.json();
      console.log(data);
      const updatedTodos = this.state.todos.map(todo => {
        if (todo._id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
      this.setState({ todos: updatedTodos });
    } catch (err) {
      console.log(err);
    }
  }

  async markIncomplete(id) {
    try {
      const response = await fetch(`/todos/markIncomplete`, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          todoIdFromJSFile: id,
        }),
      });
      const data = await response.json();
      console.log(data);
      const updatedTodos = this.state.todos.map(todo => {
        if (todo._id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });
      this.setState({ todos: updatedTodos });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { todos } = this.state;
    const left = todos.filter(todo => !todo.completed).length;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="" alt="logo" />
          <div>
            <h1>Check the scroll</h1>
            <ul>
              {todos.map(todo => (
                <li key={todo._id} className="todoItem" data-id={todo._id}>
                  <span className={todo.completed ? 'completed' : 'not'}>
                    {todo.todo}
                  </span>
                  <span className="complete" onClick={() => this.markComplete(todo._id)}>
                    Complete
                  </span>
                  <span className="incomplete" onClick={() => this.markIncomplete(todo._id)}>
                    Incomplete
                  </span>
                  <span className="del" onClick={() => this.deleteTodo(todo._id)}>
                    Delete
                  </span>
                </li>
              ))}
            </ul>
            <h2>Things left to do: {left}</h2>

            <form action="../../todos/createTodo" method="POST">
              <input type="text" placeholder="Enter Todo Item" name="todoItem" />
              <input type="submit" />
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;