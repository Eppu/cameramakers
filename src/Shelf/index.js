import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import ShelfItem from './ShelfItem';

function Shelf(props) {
  const { images, height, selected } = props;
  const { width } = props.size;

  const styles = {
    shelf: {
      height: `${height}px`,
      width: '100%',
      overflow: 'hidden',
      marginLeft: 'auto',
      marginRight: 'auto',
      // maxWidth: '1920px',
    },
  };

  /**
   * On larger screens where ShelfItems don't fill the entire screen, adjust
   * ShelfItem backgrounds to be larger than the given height
   */
  let backgroundWidth = height;
  if (width > height * images.length) {
    backgroundWidth *= 1.2 * (width / (height * images.length));
  }

  // Create ShelfItems whose backgrounds are the images
  const shelfItems = [];
  for (let i = 0; i < images.length; i += 1) {
    // Calculate element width
    let itemWidth = 0;
    if (typeof selected === 'number') {
      // Something is selected
      if (i === selected) {
        // Current element is selected. Set width to height.
        itemWidth = backgroundWidth;
      } else {
        // Current element is not selected. Set width accordingly.
        itemWidth = Math.floor((width - backgroundWidth) / (images.length - 1));
      }
    } else {
      // No elements are selected. Make all widths equal
      itemWidth = Math.floor(width / images.length);
    }

    // Create ShelfItem element
    const item = (
      <ShelfItem
        key={i}
        background={images[i]}
        width={itemWidth}
        backgroundWidth={backgroundWidth}
        isActive={i === selected}
        onClick={() => props.handleSelect(i)}
      />
    );

    // Add ShelfItem to array to be rendered
    shelfItems.push(item);
  }

  return (
    <div style={styles.shelf}>
      {shelfItems}
    </div>
  );
}

Shelf.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  handleSelect: PropTypes.func,
  height: PropTypes.number,
  selected: PropTypes.number,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    position: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
    }),
  }),
};

Shelf.defaultProps = {
  images: [],
  handleSelect: () => console.log('Handling Shelf select...'),
  height: 0,
  selected: 0,
  size: { width: 0 },
};

export default sizeMe()(Shelf);
