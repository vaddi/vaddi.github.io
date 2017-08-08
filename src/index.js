import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

// import components example
// import { Button } from './components/Button';

const appName = 'rbase';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{appName}</h1>
        <p>Edit me: src/index.js</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

