import React from 'react';
import PropTypes from 'prop-types';

import './MultiColumn.css';

class MultiColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { columns, children } = this.props;
    let width;

    switch (columns) {
      case 2:
        width = '50%';
        break;
      case 3:
        width = '33%';
        break;
      default:
        width = '100%';
        break;
    }

    if (this.state.width <= 700) {
      width = '100%';
    }

    return (
      <div className="MultiColumn" style={{ width }}>
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

MultiColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  columns: PropTypes.number,
};

MultiColumn.defaultProps = {
  children: [],
  columns: 2,
};

export default MultiColumn;
