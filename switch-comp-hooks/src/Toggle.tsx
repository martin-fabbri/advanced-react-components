import React, { Component } from 'react'
import Switch from './Switch'

interface IContext {
  on: boolean;
  toggle: () => void;
}

interface IState extends IContext {
}

type ChildrenFunc = (context: IContext) => IContext;

interface IProps {
  on?: boolean;
  onToggle: () => void;
  children: React.ReactNode[];
}

const noop = () => {};

const ToggleContext = React.createContext<IContext>({
  on: false,
  toggle: noop,
});

type childrenProps = {
  children: string;
}

class Toggle extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      on: props.on || false,
      toggle: this.toggle,
    }
  }

  static On = (children: childrenProps) => (
    <ToggleContext.Consumer>
      {context => {
        const { on } = context;
        return on ? children.children : null;
      }}
    </ToggleContext.Consumer>
  );

  static Off = (children: childrenProps) => (
    <ToggleContext.Consumer>
      {context => {
        const { on } = context;
        return on ? null : children.children;
      }}
    </ToggleContext.Consumer>
  );

  static Button = () => (
    <ToggleContext.Consumer>
      {context => {
        return <Switch on={context.on} onClick={context.toggle}/>
      }}
    </ToggleContext.Consumer>
  );

  private toggle = () => {
    this.setState({
      ...this.state,
      on: !this.state.on,
    })
  }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}

export default Toggle;