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
      const swUrl = window.location.protocol + '//' + window.location.host + '/service-worker.js'
      console.log('SW Url:', swUrl)
      console.log('registering new service worker')
      navigator.serviceWorker.register(window.location.protocol + '//' + window.location.host + '/service-worker.js')
        .then(registration => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker === null) {
              return
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New update found')
                } else {
                  console.log('No new update')
                }
              }
            }
          }
        })
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
