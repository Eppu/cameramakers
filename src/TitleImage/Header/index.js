import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

function Header(props) {
  const { logo } = props;

  return (
    <div className="Header">
      <div className="content">
        <img src={logo} alt="Cameramakers" className="logo" />
        <ul>
          <li>I would like to...</li>
          <li><a href="#action">Share knowledge</a></li>
          <li><a href="#action">Provide spare parts</a></li>
          <li><a href="#action">Get a repair quote</a></li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  logo: PropTypes.string,
};

Header.defaultProps = {
  logo: '',
};

export default Header;
