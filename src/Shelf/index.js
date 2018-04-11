import React from 'react';
import PropTypes from 'prop-types';

import ShelfItem from './ShelfItem';

const styles = {
  shelf: {
    backgroundColor: 'blue',
  },
};

function Shelf(props) {
  const { images } = props;

  // Create ShelfItems whose backgrounds are the images
  const shelfItems = [];
  for (let i = 0; i < images.length; i += 1) {
    const item = (
      <ShelfItem background={images[i]} />
    );
    shelfItems.push(item);
  }

  return (
    <div className="Shelf">
      {shelfItems}
    </div>
  );
}

Shelf.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

Shelf.defaultProps = {
  images: [],
};

export default Shelf;
