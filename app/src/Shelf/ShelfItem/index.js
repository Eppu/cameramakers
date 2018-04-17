import React from 'react';
import PropTypes from 'prop-types';

class ShelfItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }


  /**
   * Handles blurring of a Shelf Item
   */
  handleBlur() {
    this.setState({
      ...this.state,
      isFocused: false,
    });
  }


  /**
   * Handles focusing of a Shelf Item
   */
  handleFocus() {
    this.setState({
      ...this.state,
      isFocused: true,
    });
  }


  render() {
    // Get props
    const {
      background,
      width,
      backgroundWidth,
      isActive,
    } = this.props;

    // Brightness reflects if this item is selected, focused, or just sitting there.
    let brightness = 0.5;
    if (this.state.isFocused) brightness = 0.75;
    if (isActive) brightness = 1;

    // Calculate styles
    const styles = {
      shelfItem: {
        display: 'inline-block',
        background: `url(${background}) center center no-repeat`,
        backgroundSize: `${backgroundWidth}px auto`,
        width: `${width}px`,
        height: '100%',
        filter: `brightness(${brightness})`,
        transitionProperty: 'width, background-size, filter',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-out',
        cursor: 'pointer',
        outline: 'none',
      },
    };

    return (
      <div
        className="ShelfItem"
        style={styles.shelfItem}
        onClick={this.props.onClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleFocus}
        onMouseLeave={this.handleBlur}
        // onKeyDown={props.handleKeyDown}
        // onKeyUp={props.handleKeyUp}
        onKeyPress={this.props.onClick} // Implement this
        role="option"
        tabIndex={0}
        aria-selected={isActive}
      />
    );
  }
}

ShelfItem.propTypes = {
  background: PropTypes.string,
  width: PropTypes.number,
  backgroundWidth: PropTypes.number,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

ShelfItem.defaultProps = {
  background: '',
  width: 0,
  backgroundWidth: 0,
  onClick: null,
  isActive: false,
};

export default ShelfItem;
