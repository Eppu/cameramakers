import React from 'react';
import PropTypes from 'prop-types';

import './FullWidthImage.css';

function FullWidthImage(props) {
  const { image } = props;

  return (
    <div
      style={{
        background: `url(${image}) no-repeat`,
        backgroundPosition: '37% 25%',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        BackgroundSize: 'cover',
        width: '100%',
      }}
      className="FullWidthImage"
    >
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

FullWidthImage.propTypes = {
  image: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

FullWidthImage.defaultProps = {
  image: '',
  children: null,
};

export default FullWidthImage;
