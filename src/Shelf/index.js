import React from 'react';
import PropTypes from 'prop-types';

import ShelfItem from './ShelfItem';

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: Math.floor(Math.random() * 5),
      windowWidth: 0,
      windowHeight: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // Handle window resizing
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      ...this.state,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }


  handleSelect(selected) {
    console.log(selected);
    this.setState({
      ...this.state,
      selected,
    });
  }


  render() {
    const { images, height } = this.props;
    const { windowWidth, selected } = this.state;

    const styles = {
      shelf: {
        height: `${height}px`,
        width: `${windowWidth}px`,
        overflow: 'hidden',
      },
    };

    console.log(windowWidth);

    // Create ShelfItems whose backgrounds are the images
    const shelfItems = [];
    for (let i = 0; i < images.length; i += 1) {
      // Calculate element width
      let width = 0;
      if (typeof selected === 'number') {
        // Something is selected
        if (i === selected) {
          // Current element is selected. Set width to height.
          width = height;
        } else {
          // Current element is not selected. Set width accordingly.
          width = Math.floor((windowWidth - height) / (images.length - 1));
        }
      } else {
        // No elements are selected. Make all widths equal
        width = Math.floor(windowWidth / images.length);
        console.log(width);
      }

      // Create ShelfItem element
      const item = (
        <ShelfItem
          key={i}
          background={images[i]}
          width={width}
          onClick={() => this.handleSelect(i)}
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
}

Shelf.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
};

Shelf.defaultProps = {
  images: [],
  height: 0,
};

export default Shelf;
