import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to={localStorage.getItem('token') ? "/dashboard" : "/login"} className="not-found-link">
        Go back to {localStorage.getItem('token') ? "Dashboard" : "Login"}
      </Link>
    </div>
  );
};

export default NotFound;
