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
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(label) {
    const event = {
      category: 'Header',
      action: 'Select header item',
      label,
    };
    this.props.analytics(event);
  }

  render() {
    const { isDesktop } = this.props;

    // Use the correct logo based on page width
    let logo;
    if (isDesktop) {
      logo = this.props.smallLogo;
    } else {
      logo = this.props.bigLogo;
    }

    // Hide content when menu is closed.
    let content;
    if (isDesktop || this.state.contentVisible) {
      // Menu is open or screen is large so we show the content
      content = (
        <div className="content">
          <img src={logo} alt="Cameramakers" className="logo" />
          <ul>
            <li>I would like to...</li>
            <li><a href="#contact" onClick={() => this.handleClick('Share knowledge')}>Share knowledge</a></li>
            <li><a href="#contact" onClick={() => this.handleClick('Provide spare parts')}>Provide spare parts</a></li>
            <li><a href="#contact" onClick={() => this.handleClick('Get a repair quote')}>Get a repair quote</a></li>
          </ul>
        </div>
      );
    } else {
      // Menu is closed. Hide content.
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

    // How to rotate the expand button
    const rotation = this.state.open ? '180deg' : 0;

    // Define header height based on screen width and open state
    let height;
    if (isDesktop) height = 58;
    else height = this.state.open ? 200 : 15;

    return (
      <div>
        <AnimateHeight
          duration={500}
          height={height}
          className="Header"
          onAnimationEnd={animEnd}
          onAnimationStart={animStart}
          animateOpacity
        >
          {content}
          {!isDesktop ?
            <button
              className="expandTrigger"
              onClick={() => {
                this.setState({ ...this.state, open: !this.state.open });
              }}
            >
              <ExpandIcon
                style={{
                  display: 'inline-block', transform: `rotate(${rotation})`,
                }}
              />
            </button>
            : null
          }
        </AnimateHeight>
      </div>
    );
  }
}

Header.propTypes = {
  analytics: PropTypes.func,
  smallLogo: PropTypes.string,
  bigLogo: PropTypes.string,
  isDesktop: PropTypes.bool,
};

Header.defaultProps = {
  analytics: null,
  smallLogo: '',
  bigLogo: '',
  isDesktop: false,
};

export default Header;
