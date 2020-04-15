import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Hello name="Kasia" age={26 + 10} />

        <Button variant="contained" color="primary">
            Hello World
        </Button>

      </header>
    </div>
  );
}


const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

export default App
