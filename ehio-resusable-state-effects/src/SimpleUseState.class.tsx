import React, { Component, useState } from 'react'

interface IProps {}

interface IState {
  text: string
  checked: boolean
}

export default function Playground() {
  const [state, setState] = useState<IState>({text: '', checked: false})
  const { text, checked } = state
  return (
    <section>
      <input
        type="text"
        value={text}
        onChange={e => setState({ ...state, text: e.target.value })}
      />
      <input
        type="checkbox"
        checked={checked}
        onChange={e =>
          setState({ ...state, checked: e.target.checked })
        }
      />
      <ul>
        <li>{text}</li>
        <li>{checked.toString()}</li>
      </ul>
    </section>
  )
}
