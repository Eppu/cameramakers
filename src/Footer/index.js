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
  children: PropTypes.element,
};

Footer.defaultProps = {
  children: null,
};

export default Footer;
