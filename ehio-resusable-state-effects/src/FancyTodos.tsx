import React, { useState, useEffect, useRef } from 'react'
import NewTodo from './NewTodo'
import TodoItem from './TodoItem'
import { Container, List } from './Styled'
import About from './About'
import Checkbox from './Checkbox'

interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

interface IProps {

}

export default function TodoList(props: IProps) {
  const initialTodos = () => JSON.parse(window.localStorage.getItem('todos') || '[]')
  const [todos, setTodos] = useState<ITodo[]>(initialTodos);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const handleKey = ({ key }: KeyboardEvent) => {
      console.log('handleKey', key);
      setShowAbout(key === '?' ? true : key === 'Escape' ? false : showAbout)
    }
    document.addEventListener('keydown', handleKey)
    return document.removeEventListener('keydown', handleKey)
  }, []);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    )
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : 'Todos'
  })

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleNewSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTodos([
        ...todos,
        { id: Date.now().toString(), text: newTodo, completed: false },
      ])
    setNewTodo('')
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo: ITodo) => todo.id !== id))
  }

  const handleCompletedToggle = (id: string) => {
    setTodos(todos.map((todo: ITodo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={handleNewChange}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleCompletedToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
      <About
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </Container>
  )
}
