import React from 'react';
import PropTypes from 'prop-types';

function ShelfItem(props) {
  const { background } = props;

  const styles = {
    shelfItem: {
      display: 'inline-block',
      background: `url(${background}) center center`,
      backgroundSize: 'cover',
      width: '100px',
      height: '100px',
    },
  };

  return (
    <div
      className="ShelfItem"
      style={styles.shelfItem}
    />
  );
}

ShelfItem.propTypes = {
  background: PropTypes.string,
};

ShelfItem.defaultProps = {
  background: '',
};

export default ShelfItem;
