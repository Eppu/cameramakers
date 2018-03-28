import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

import './TitleImage.css';

function TitleImage(props) {
  const {
    title,
    subtitle,
    logo,
    cornerLogo,
  } = props;

  return (
    <div className="TitleImage">
      <Header logo={cornerLogo} />
      <div className="titles">
        {title ? <h1>{title}</h1> : <img src={logo} alt="Cameramakers" className="mainLogo" />}
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

TitleImage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  logo: PropTypes.string,
  cornerLogo: PropTypes.string,
};

TitleImage.defaultProps = {
  title: '',
  subtitle: 'subtitle prop text',
  logo: '',
  cornerLogo: '',
};

export default TitleImage;
