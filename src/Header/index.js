import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import ExpandIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, open: false, contentVisible: false };
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

  /**
   *  CLOSED
   *    Content:
   *      - Expand icon
   *    On animation start:
   *      - Add menu content
   *
   *  OPEN
   *    Content:
   *      - Menu content
   *      - Expand icon
   *    On animation end:
   *      - Remove menu content
   */


  render() {
    // Use the correct logo based on page width
    let logo;
    if (this.state.width > 700) {
      logo = this.props.smallLogo;
    } else {
      logo = this.props.bigLogo;
    }

    let content;
    if (this.state.width > 700 || this.state.contentVisible) {
      // Menu content
      content = (
        <div className="content">
          <img src={logo} alt="Cameramakers" className="logo" />
          <ul>
            <li>I would like to...</li>
            <li><a href="#action">Share knowledge</a></li>
            <li><a href="#action">Provide spare parts</a></li>
            <li><a href="#action">Get a repair quote</a></li>
          </ul>
        </div>
      );
    } else {
      content = null;
    }

    // Set what should happen when the animation starts and ends
    let animStart;
    let animEnd;
    if (this.state.open) {
      // Menu open or opening. Animation start should show menu content.
      animStart = () => this.setState({ ...this.state, contentVisible: true });
      animEnd = () => { };
    } else {
      // Menu is closed or closing. Animation end should remove menu content.
      animStart = () => { };
      animEnd = () => this.setState({ ...this.state, contentVisible: false });
    }

    const rotation = this.state.open ? '180deg' : 0;

    let height;
    if (this.state.width > 700) height = 50;
    else height = this.state.open ? 195 : 15;

    return (
      <div>
        <AnimateHeight
          duration={300}
          height={height}
          className="Header"
          onAnimationEnd={animEnd}
          onAnimationStart={animStart}
        >
          {content}
          {this.state.width <= 700 ?
            <ExpandIcon
              style={{
                position: 'absolute', bottom: 0, left: '50%', transform: `translateX(-50%) rotate(${rotation})`, zIndex: 9,
              }}
              onClick={() => {
                this.setState({ ...this.state, open: !this.state.open });
              }}
            />
            : null
          }
        </AnimateHeight>

      </div>
    );
  }
}

Header.propTypes = {
  smallLogo: PropTypes.string,
  bigLogo: PropTypes.string,
};

Header.defaultProps = {
  smallLogo: '',
  bigLogo: '',
};

export default Header;
