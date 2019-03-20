import { ITodoItemProps } from '../../switch-comp-hooks/src/interfaces'
import React from 'react'
import { useTodosContext } from './TodosContext'

function TodoItem({ id, completed, text }: ITodoItemProps) {
  const { dispatch } = useTodosContext();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <input type="checkbox" checked={completed} onChange={() => dispatch({type: 'complete', payload: id})}/>
      <input type="text" defaultValue={text}/>
      <button onClick={() => dispatch({type: 'delete', payload: id})}>Delete</button>
      {id}
    </div>
  );
}

export default TodoItem;
