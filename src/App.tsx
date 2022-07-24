import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    document.addEventListener('visibilitychange', checkVisibility)

    return () => document.removeEventListener('visibilitychange', checkVisibility)
  }, [])

  function checkVisibility() {
    if (document.visibilityState === 'visible' && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register(window.location.protocol + '//' + window.location.host + '/service-worker.js')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx again and again</code> and save to reload.
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
