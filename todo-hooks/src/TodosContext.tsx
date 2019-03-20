import React, { useContext } from 'react';
import { TodoAction } from '../../switch-comp-hooks/src/interfaces'

export interface ITodosContext {
  dispatch: (action: TodoAction) => void;
}

const noopAction = (action: TodoAction) => {};

export const TodosContext = React.createContext<ITodosContext>({dispatch: noopAction});

export function useTodosContext() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error(
      'Todos context is not available.'
    )
  }
  return context;
}