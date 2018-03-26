import React from 'react';
import PropTypes from 'prop-types';

import './TitleImage.css';

function TitleImage(props) {
  return (
    <div className="TitleImage">
      <div className="titles">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
    </div>
  );
}

TitleImage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // image: PropTypes.element,
};

TitleImage.defaultProps = {
  title: 'title prop text',
  subtitle: 'subtitle prop text',
  // image: null,
};

export default TitleImage;
