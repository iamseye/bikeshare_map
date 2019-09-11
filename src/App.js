import React from 'react';
import Header from './components/header.js';
import MapBikes from './components/mapBikes.js';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <MapBikes />
    </div>
  );
}

export default App;
