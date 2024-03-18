import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyDay from './MyDay';
import MyFood from './MyFood';
import '../index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/myday">My Day</Link>
              </li>
              <li>
                <Link to="/plan">Plan</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div>
          <Routes>
            <Route path="/myday" element={<MyDay />} />
            <Route path="/plan" element={<MyFood />} />
          </Routes>
        </div>
        <footer>
          <p>Fila Mohamed</p>
          <p>Phone: 2064608105</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;