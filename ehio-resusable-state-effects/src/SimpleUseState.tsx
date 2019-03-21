import React, { Component } from 'react'

interface IProps {
}

interface IState {
  text: string
  checked: boolean
}

export default class Playground extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { text: '', checked: false }
  }

  render() {
    const { text, checked } = this.state
    return (
      <section>
        <input
          type="text"
          value={text}
          onChange={e => this.setState({ ...this.state, text: e.target.value })}
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={e => this.setState({ ...this.state, checked: e.target.checked })}
        />
        <ul>
          <li>{text}</li>
          <li>{checked.toString()}</li>
        </ul>
      </section>
    )
  }
}
