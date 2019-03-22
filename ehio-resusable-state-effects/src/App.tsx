import React, { Component } from 'react';
import SimpleUseState from './SimpleUseState';
import Battery from './Battery'
import FancyTodos from './FancyTodos'
import SetFocus from './SetFocus'

class App extends Component {
  render() {
    return (
      <div>
        <FancyTodos />
      </div>
    );
  }
}

export default App;
