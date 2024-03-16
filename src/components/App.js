import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import necessary components from react-router-dom
import MyDay from './MyDay'; // Import MyDay component
import MyFood from './MyFood'; // Import MyFood component
import '../index.css'; // Import CSS styles
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
      </div>
    </Router>
  );
}

export default App;
