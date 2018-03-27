import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

function Footer(props) {
  return (
    <footer>
      {props.children}
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Footer.defaultProps = {
  children: [],
};

export default Footer;
