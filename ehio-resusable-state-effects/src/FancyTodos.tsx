import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import NewTodo from './NewTodo'
import TodoItem from './TodoItem'
import { Container, List } from './Styled'
import About from './About'

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

interface IProps {
}

function useLocalStorage<T>(key: string, defaultValue?: T, callback?: ()=>void): [T, Dispatch<T>] {
  const valueFromStorage = window.localStorage.getItem(key);
  const initialValue = valueFromStorage ? JSON.parse(valueFromStorage) : defaultValue;
  const [value, setValue] = useState<T>(initialValue);
  const setItem = (newValue: T) => {
    setValue(newValue)
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }
  return [value, setItem]
}

export default function TodoList(props: IProps) {
  const todoId = useRef<number>(0);
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', []);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('')

  useEffect(() => {
    const handleKey = ({ key }: KeyboardEvent) => {
      console.log('handleKey', key);
      setShowAbout(key === '?' ? true : key === 'Escape' ? false : showAbout)
    }
    document.addEventListener('keydown', handleKey)
    return document.removeEventListener('keydown', handleKey)
  }, []);

  useEffect(() => {
    setTodos(todos);
    const inCompleteTodos = todos.reduce(
      (memo: number, todo: ITodo) => (!todo.completed ? memo + 1 : memo),
      0
    )
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : 'Todos'
  }, [todos])

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleNewSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    todoId.current += 1;
    setTodos([
        ...todos,
        { id: todoId.current, text: newTodo, completed: false },
      ])
    setNewTodo('')
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo: ITodo) => todo.id !== id))
  }

  const handleCompletedToggle = (id: number) => {
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
