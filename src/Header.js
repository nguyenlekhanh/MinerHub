import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you've installed react-router-dom for navigation

const Header = () => {
  return (
    <header className="navbar navbar-expand navbar-dark bd-navbar border-bottom">
        <nav className="container-xxl flex-wrap flex-md-nowrap" aria-label="Main navigation">
          <div className="collapse navbar-collapse" id="bdNavbar">
            <hr className="d-md-none text-white-50" />
            <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
              <li className="nav-item col-6 col-md-auto ms-2">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item col-6 col-md-auto ms-2">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="nav-item col-6 col-md-auto ms-2">
                <Link to="/donate">Donate</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
  );
};

export default Header;

