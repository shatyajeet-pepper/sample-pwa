import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [newUpdateFound, setNewUpdateFound] = useState(false)
  useEffect(() => {
    document.addEventListener('visibilitychange', checkVisibility)
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        registration?.addEventListener('updatefound', handleNewUpdateAvailable)
      })

    return () => document.removeEventListener('visibilitychange', checkVisibility)
  }, [])

  function checkVisibility() {
    if (document.visibilityState === 'visible' && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then(registration => {
          registration?.update()
        })
    }
  }

  function handleNewUpdateAvailable() {
    setNewUpdateFound(true)
  }

  function handleUpdateClick() {
    navigator.serviceWorker.getRegistration()
      .then(reg => {
        reg?.waiting?.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {newUpdateFound && <div>
          <div>New Update Found!</div>
          <button onClick={handleUpdateClick}>Update</button>
        </div>}
        <p>
          Edit <code>src n with sw with skip waiting and reload</code> and save to reload.
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
