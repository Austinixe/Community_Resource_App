import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏘️ Community Resource Board
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/create-resource" className="navbar-link">
                  Add Resource
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/my-resources" className="navbar-link">
                  My Resources
                </Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user">👋 {user?.name}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-button-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;