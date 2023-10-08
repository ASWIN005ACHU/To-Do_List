import React, { useEffect } from 'react'
import './App.css'

export default function ToDo() {
  const [text, setText] = React.useState('');
  const [todo, setTodo] = React.useState([])
  const [completed, setCompleted] = React.useState([])

  const HandleCreated = (e) => {
    e.preventDefault();
    setTodo(Todos => {
      return [...Todos, { id: Date.now(), title: text }]
    })
  }

  const deleteTodo = (id) => {
    setTodo(currentTodo => {
      return (
        currentTodo.filter(obj => obj.id !== id)
      )
    })
  }

  const CreateTodo = (id) => {
    const completedTask = todo.find((obj) => obj.id === id);
    if (completedTask) {
      setCompleted((prevCompleted) => [...prevCompleted, completedTask]);
      deleteTodo(id);
    }
  };

  const RestoreToTodo = (id) => {
    const completedTask = completed.find((obj) => obj.id === id);
    if (completedTask) {
      setTodo((prevTodo) => [...prevTodo, completedTask]);
      setCompleted((prevCompleted) =>
        prevCompleted.filter((obj) => obj.id !== id)
      );
    }
  };


  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todo))
  }, [todo])

  return (
    <div className="backgrondDiv">
      <header>
        <form>
          <h4 className="text-center text-light">ToDo</h4>
          <div className='inputDiv'>
            <input type="text" className="input" value={text} onChange={(e) => { setText(e.target.value) }} />
            <button className="addButton" onClick={HandleCreated}>Create ToDo</button>
          </div>
        </form>
      </header>
      <div>
        {todo.length > 0 && (
          <div className='createdToDoDiv'>
            <ul className='list-group'>
              {todo.map((value) => {
                return (
                  <div key={value.id} className='list-group-item list-group-item-action flex-column align-items-start'>
                    <div className='d-flex w-100 justify-content-between'>
                      <h5 className='mb-1'>{value.title}</h5>
                      <div className='text-right'>
                        <button className='btn btn-danger btn-sm ml-1 mr-1' onClick={() => deleteTodo(value.id)}>Delete</button>
                        <button className='btn btn-success btn-sm ml-1 mr-1' onClick={() => CreateTodo(value.id)}>Done</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
        )}
        <hr />
        <div className='container-fluid bg-white rounded'>
          <h4 className='text-center text-dark m-4'>Completed</h4>
          <ul className='list-group'>
            {completed.map((value) => (
              <div key={value.id} className='items list-group-item flex-column align-items-center m-1'>
                <h5 className='completedText text-white text-center'>{value.title}</h5>
                <button className="btn btn-success btn-sm text-white rounded" onClick={() => RestoreToTodo(value.id)}>Restore</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}