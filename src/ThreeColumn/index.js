import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import './ThreeColumn.css';

function ThreeColumn(props) {
  return (
    <div className="ThreeColumn">
      <div className="content">
        {props.link ?
          <RaisedButton label={props.title} primary href={props.link} /> :
          <h2>{props.title}</h2>
        }
        <p>{props.text}</p>
      </div>
    </div>
  );
}

ThreeColumn.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
};

ThreeColumn.defaultProps = {
  title: 'title prop content',
  text: 'text prop content',
  link: undefined,
};

export default ThreeColumn;
