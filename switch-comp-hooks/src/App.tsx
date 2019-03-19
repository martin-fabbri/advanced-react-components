import React, { Component } from 'react';
import Toggle from './Toggle';

class App extends Component {
  render() {
    const onToggle = () => console.log('onToggle');
    return (
      <Toggle on={true} onToggle={onToggle}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <div>
          <Toggle.Button />
        </div>
      </Toggle>
    );
  }
}

export default App;
