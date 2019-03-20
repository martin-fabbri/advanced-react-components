import React, { useReducer, useEffect, useRef } from 'react'
import TodosList from './TodosList'
import appReducer from './AppReducer'
import { TodosContext } from './TodosContext'

function useEffectOnce(cb: () => void) {
  const didRun = useRef(false);
  useEffect(() => {
    if (!didRun.current) {
      cb();
      didRun.current = true;
    }
  })
}

function TodosApp() {
  // @ts-ignore
  const [state, dispatch] = useReducer(appReducer, [])
  useEffectOnce(() => {
    const raw = localStorage.getItem('data')
    if (raw) {
      dispatch({type: 'reset', payload: JSON.parse(raw)})
    }
  });
  useEffect(() => localStorage.setItem('data', JSON.stringify(state)), [state]);
  return (
    <TodosContext.Provider value={{dispatch}}>
      <div>
        <h1>Todos:</h1>
        <button onClick={() => dispatch({ type: 'add' })}>New Todo</button>
        <TodosList items={state}/>
      </div>
    </TodosContext.Provider>
  )
}

export default TodosApp
