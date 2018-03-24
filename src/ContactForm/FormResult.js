import React from 'react';
import PropTypes from 'prop-types';

import './ContactFormStyle.css';

function FormResult(props) {
  if (props.response) {
    const { response } = props;

    // Form submission resulted in an error.
    if (props.response.status === 'error') {
      return (
        <p className="FormResult error">Error! {response.error}</p>
      );
    }

    // Form submission was a success.
    if (props.response.status === 'ok') {
      return (
        <p className="FormResult ok">Success!</p>
      );
    }
  }

  return null;
}

FormResult.propTypes = {
  response: PropTypes.shape({
    status: PropTypes.oneOf(['ok', 'error']),
    error: PropTypes.string,
  }),
};

FormResult.defaultProps = {
  response: {
    status: undefined,
    error: undefined,
  },
};

export default FormResult;
