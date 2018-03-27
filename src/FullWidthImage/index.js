import React from 'react';
import PropTypes from 'prop-types';

import './FullWidthImage.css';

function FullWidthImage(props) {
  const { image } = props;

  return (
    <div
      style={{
        background: `url(${image}) no-repeat center center`,
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
  image: PropTypes.element,
  children: PropTypes.element,
};

FullWidthImage.defaultProps = {
  image: null,
  children: null,
};

export default FullWidthImage;
