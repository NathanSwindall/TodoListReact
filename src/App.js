import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";

/*

  ------ GETTING STARTED ------

  In order to begin this challenge, you must first:
   - Signup for a Codepen account and log in.
   - Fork this pen to create a personal copy of the challenge by clicking the "Fork" button at the bottom of the browser window.
   
  
  ----- SUBMISSION INSTRUCTIONS -----
  
  To submit your work:
   - Make sure to save your work by clicking the "Save" button at the top of the browser window.
   - Email the URL of your forked pen to talent@ender.com


   --------- THE CHALLENGE ---------
  
  Build a todo list application.
  
  1. Display completed and unfinished todos in separate lists.
  
  2. Clicking on a todo item should toggle its completed status.
  
  3. Clicking on the "X" button of a todo item should remove that todo entirely.
  
  4. The todo form should be able to create a new todo and add it to the list of todos.
  
  5. Use the SCSS panel to match the styles from this example:
     https://ender-public-dev.s3.us-east-2.amazonaws.com/files/ad94e4e0e1fb41c4b517b2971902bf35

*/

import { v4 } from "uuid";

// // use "generateId()" function to create a unique id
const generateId = v4;

function TodoForm(props) {
  return (
    <form className="create-todo-form" onSubmit={props.getTodo}>
      <h2>Create a New Todo</h2>
      <input
        name="todo-name"
        id="todoName"
        type="text"
        placeholder="Enter todo description"
        autoComplete="off"
      />
      {props.error}
      <button className="submit-btn" 
              type="submit" >
        Create Todo
      </button>
    </form>
  );
}



function TodoListItem(props) {
  const { name, id } = props;
  // toggle item's completed status on name click.
  // delete item on "X" click.
  return (
    <div className={props.title + "-item"} onClick={(e) =>props.toggleTodo(id)} >
      <span>{name}</span>
      <button onClick={(e) => {e.stopPropagation(); props.deleteTodo(id)}}>X</button>
    </div>
  );
}

function TodoList(props) {
  return (
    <div className={props.title + "-list"}>
      <h2>{props.title}:</h2>
      {
        props.todos.map((todo) => (<TodoListItem 
          key={todo.id}
          name ={todo.name}
          id = {todo.id}
          deleteTodo = {props.deleteTodo}
          toggleTodo = {props.toggleTodo}
          title = {props.title}
          />))
      }
    </div>
  );
}



class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    this.validationHandler = this.validationHandler.bind(this)

    this.state = {
      todos: [
        {
          id: "asdfv",
          name: "Practice Guitar",
          isCompleted: false
        },
        {
          id: "gsdfw",
          name: "Take out Recycling",
          isCompleted: false
        },
        {
          id: "23gsd",
          name: "Exercise",
          isCompleted: false
        },
        {
          id: "6ghsd",
          name: "Buy Groceries",
          isCompleted: false
        },
        {
          id: "dfg83",
          name: "Send Birthday Cards",
          isCompleted: true
        },
        {
          id: "y84cd",
          name: "Sweep Porch",
          isCompleted: true
        }
      ],
      errorMessage: ""
    };
  }


  createTodo(name) {
    this.setState((prevState) =>({
      todos : prevState.todos.concat({ id : generateId(),name, isCompleted: false})
    }))

    console.log(this.state.todos)
  }

  getTodo = (e) => {
    e.preventDefault()
    let todo = e.target.elements['todo-name'].value.trim()
    this.validationHandler(todo)
    e.target.elements['todo-name'].value = ""
  }

  deleteTodo(id) {
      this.setState((prevState) => ({
          todos : prevState.todos.filter((todo) => todo.id !== id)
      }))
  }
  

  toggleTodo(id) {
    let updateTodo = this.state.todos.find((todo) => todo.id === id)
    updateTodo.isCompleted = !updateTodo.isCompleted
    
    this.setState((prevState) => ({
        todos : prevState.todos.filter((todo) => todo.id !== id).concat(updateTodo)
    }))
  }

  getNotCompleted(){
      return this.state.todos.filter((todo) => (todo.isCompleted === false))
  }

  getCompleted(){
    return this.state.todos.filter((todo) => (todo.isCompleted === true))
  }

  validationHandler = (userInput) => {
    let isNotTodo = this.state.todos.find((todo) => todo.name === userInput)
    console.log(isNotTodo)
    if(userInput === ""){
      this.setState((prevState) => ({
        errorMessage: <strong>Please enter a todo item!</strong>
      }))
    }
    else if(isNotTodo)
    {
      this.setState((prevState) => ({
        errorMessage: <strong>This is already on the todo list!</strong>
      }))
    }
    else
    {
      this.setState((prevState) => ({
        errorMessage: ""
      }))
      this.createTodo(userInput)
    }
  }

 

  render() {
    return (
      <div className="content">
        <h1 className="title">Todo App</h1>
        <TodoForm getTodo={this.getTodo}
                  error={this.state.errorMessage}/>
        <div className="lists-wrapper">
          <TodoList 
                todos={this.getNotCompleted()} 
                deleteTodo={this.deleteTodo} 
                title="Todo" 
                toggleTodo={this.toggleTodo}
                validationHandler={this.validationHandler}/>
          <TodoList 
                todos={this.getCompleted()} 
                deleteTodo={this.deleteTodo} 
                title="Completed" 
                toggleTodo={this.toggleTodo}
                validationHandler={this.validationHandler}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;