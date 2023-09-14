import React from 'react';
import "../Style/header.css"

// This is the header of the website
function Header() {
  return (
    <header className="unsplash-header">
      <div className="unsplash-logo">
        <img src="./Photofolio.png" alt="PhotoFolio Logo" />
      </div>
      <div className="navigation-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/collections">Collections</a></li>
          <li><a href="/explore">Explore</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
        </ul>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="button">Search</button>
      </div>
    </header>
  );
}

export default Header;
