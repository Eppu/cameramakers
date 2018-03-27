import React from 'react';
import PropTypes from 'prop-types';

function Avatar(props) {
  const { image, size } = props;

  const styles = {
    container: {
      width: `${size}px`,
      height: `${size}px`,
      overflow: 'hidden',
      borderRadius: '50%',
      background: `url(${image}) no-repeat center center`,
      backgroundSize: 'cover',
    },
  };

  return (
    <div className="Avatar" style={styles.container} />
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  image: '',
  size: 50,
};

export default Avatar;
