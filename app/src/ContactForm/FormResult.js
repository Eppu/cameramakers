import React from 'react';
import PropTypes from 'prop-types';

import { white } from 'material-ui/styles/colors';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Report from 'material-ui/svg-icons/content/report';

import './ContactFormStyle.css';

function FormResult(props) {
  if (props.response) {
    const { response } = props;

    // Form submission resulted in an error.
    if (props.response.status === 'error') {
      return (
        <div>
          <p className="FormResult error">
            <Report className="icon" color={white} />
            Oops! We were unable to send your message. {response.error}.
          </p>
        </div>
      );
    }

    // Form submission was a success.
    if (props.response.status === 'ok') {
      return (
        <div>
          <p className="FormResult ok">
            <CheckCircle className="icon" color={white} />
            Message sent. Thanks for getting in touch!
          </p>
        </div>
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
