import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import ShelfItem from './ShelfItem';

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: Math.floor(Math.random() * 5),
      // windowWidth: 0,
      // windowHeight: 0,
    };
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // Handle window resizing
  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   this.setState({
  //     ...this.state,
  //     windowWidth: window.innerWidth,
  //     windowHeight: window.innerHeight,
  //   });
  // }


  /**
   * Handles selection of ShelfItems.
   * @param {number} selected Index of selected ShelfItem
   */
  handleSelect(selected) {
    this.setState({
      ...this.state,
      selected,
    });
  }


  render() {
    const { images, height } = this.props;
    const { selected } = this.state;
    const { width } = this.props.size;

    const styles = {
      shelf: {
        height: `${height}px`,
        width: '100%',
        overflow: 'hidden',
      },
    };

    // Create ShelfItems whose backgrounds are the images
    const shelfItems = [];
    for (let i = 0; i < images.length; i += 1) {
      // Calculate element width
      let itemWidth = 0;
      if (typeof selected === 'number') {
        // Something is selected
        if (i === selected) {
          // Current element is selected. Set width to height.
          itemWidth = height;
        } else {
          // Current element is not selected. Set width accordingly.
          itemWidth = Math.floor((width - height) / (images.length - 1));
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
          height={height}
          isActive={i === selected}
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
  height: 0,
  size: { width: 0 },
};

export default sizeMe()(Shelf);
