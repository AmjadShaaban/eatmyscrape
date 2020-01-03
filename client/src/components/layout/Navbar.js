import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: ' eat my sCRAPe',
  icon: 'fas fa-poo'
};

Navbar.prototypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
