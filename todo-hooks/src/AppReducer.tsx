import React from 'react'
import { Todo, TodoAction } from '../../switch-comp-hooks/src/interfaces'

function appReducer(state: Todo[], action: TodoAction) {
  const { type, payload } = action;
  switch (type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: '',
          completed: false,
        },
      ]
    case 'delete':
      return state.filter(item => item.id !== payload);
    case 'complete':
      return state.map(item => item.id === payload ? {...item, completed: !item.completed} : {...item});
    case 'reset':
      return action.payload;
    default:
      return state
  }
}

export default appReducer;