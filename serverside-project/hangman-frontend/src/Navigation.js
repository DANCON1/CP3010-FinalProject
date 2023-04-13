import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
    <ul style={{ display: 'flex', flexDirection: 'row' }}>
      <li style={{ marginRight: '2rem' }}>
          <Link to="/">Hangman Home</Link>
        </li>
        <li>
          <Link to="/stats">View Player Stats</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;