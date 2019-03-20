import { ITodoListProps } from '../../switch-comp-hooks/src/interfaces'
import React from 'react'
import TodoItem from './TodoItem'

function TodosList({ items }: ITodoListProps) {
  return (
    <>
      {items.map(item => <TodoItem key={item.id} {...item}/>)}
    </>
  )
}

export default TodosList;