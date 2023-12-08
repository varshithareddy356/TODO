import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Style.css"
const TodoApp=()=>{
  const [todos,setTodos]=useState([]);
  const [newTask,setNewTask]=useState("");
  const [showCompleted,setShowCompleted]=useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    
    axios.get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error fetching todos:", error));
  }, []);
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
      setErrorMessage(""); 
    } else {
      setErrorMessage("Text should not be empty"); 
    }
  };


  const handleToggleComplete=(id)=>{
    const updatedTodos=todos.map(todo=>
      todo.id===id?{ ...todo,completed:!todo.completed }:todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask=(id,newTitle)=>{
    const updatedTodos=todos.map(todo =>
      todo.id === id?{ ...todo,title:newTitle}:todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask=(id)=>{
    const updatedTodos=todos.filter(todo=>todo.id!==id);
    setTodos(updatedTodos);
  };

  const filteredTodos=showCompleted?todos.filter(todo=>todo.completed):todos;

  return (
    <div>
      <h1 className='heading'>Todo App</h1>
      <div>
      <input
          className="inputdata"
          type="text"
          placeholder="Enter Task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setErrorMessage(""); 
          }}
        />
        <button className="addadata" onClick={handleAddTask}>Add Task</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div>
        <label>
         <p > Show Completed</p>
          <input className='input1'
            type="checkbox"
            checked={showCompleted}
            onChange={()=>setShowCompleted(!showCompleted)}
           
          />
        </label>
      </div>
      <ol>
        {filteredTodos.map((todo) => (
          <li  className="listdata" key={todo.id} style={{textDecoration:todo.completed?'line-through':'none' }} >
            {todo.title}
            <div className="buttondata">
            <button className="completestyle" onClick={()=>handleToggleComplete(todo.id)}>
              {todo.completed?'Undo':'Completed'}
            </button>
            <button className="editdata"
              onClick={()=>handleEditTask(todo.id, prompt('Enter new title:',todo.title)) }
            >
              Edit
            </button>
            <button  className="deletedata" onClick={()=>handleDeleteTask(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoApp;
