import React from 'react';
import PropTypes from 'prop-types';

function ShelfItem(props) {
  const { background, width, height } = props;

  const styles = {
    shelfItem: {
      display: 'inline-block',
      background: `url(${background}) center center no-repeat`,
      backgroundSize: `${height}px auto`,
      width: `${width}px`,
      height: '100%',
      transitionProperty: 'width, background-size',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease-out',
    },
  };

  console.log(height);

  return (
    <div
      className="ShelfItem"
      style={styles.shelfItem}
      onClick={props.onClick}
    />
  );
}

ShelfItem.propTypes = {
  background: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
};

ShelfItem.defaultProps = {
  background: '',
  width: 0,
  height: 0,
  onClick: () => console.log('clicked'),
};

export default ShelfItem;
