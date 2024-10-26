import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';

function App() {
  return (
    <div className="App">
      <Button onClick={() => fetch('http://localhost:5000/get_IPlocation').then(res => res.json()).then(console.log)} label="Get IP Location" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
