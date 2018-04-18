import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import FormResult from './FormResult';
import sendMail from './sendMail';

import './ContactFormStyle.css';


// Error messages
const errorMessages = {
  emptyInput: 'Please enter a value.',
  invalidEmail: 'Email address is not valid',
};


// Blank state we can reset to once the form has been submitted.
const newState = {
  firstName: {
    value: '',
    touched: false,
    error: errorMessages.emptyInput,
  },
  lastName: {
    value: '',
    touched: false,
    error: errorMessages.emptyInput,
  },
  email: {
    value: '',
    touched: false,
    error: errorMessages.emptyInput,
  },
  subject: {
    value: '',
    touched: false,
    error: errorMessages.emptyInput,
  },
  message: {
    value: '',
    touched: false,
    error: errorMessages.emptyInput,
  },
  isSending: false,
  response: {
    status: undefined,
    error: undefined,
  },
  isValid: false,
  hasFilledForm: false,
};


class ContactForm extends React.Component {
  /**
   * Validates input values.
   * Returns an error message if an input is invalid or undefined if an input is valid.
   * @param {string} name Input field's name
   * @param {object} item Input's corresponding object in state.
   * @returns {(string|undefined)} Error message, or undefined if there is no error.
   */
  static isValid(name, item) {
    // Input cannot be empty
    if (!item.value.length > 0) {
      return errorMessages.emptyInput;
    }

    // Email input has to be a valid email address
    const mailFormat = /\S+@\S+\.\S/;
    if (name === 'email' && !item.value.match(mailFormat)) return errorMessages.invalidEmail;

    // If everything is valid...
    return undefined;
  }


  /**
   * Tries to make an input VALID by removing its error message.
   * Call this whenever an input's value changes. We want to show the user that
   * their input is correct as soon as possible.
   * @param {string} name Input field's name
   * @param {object} item Input's corresponding object in state.
   * @returns {object} Updated input data object to be saved in state.
   */
  static tryToMakeValid(name, item) {
    const error = ContactForm.isValid(name, item);
    if (error === undefined) {
      // Input is valid. Remove error.
      return { ...item, error: undefined };
    }
    return item;
  }


  /**
   * Tries to make an input INVALID by giving it an error message.
   * Call this whenever an input is blurred. We don't want to warn the user when
   * they are still typing.
   * @param {string} name Input field's name
   * @param {object} item Input's corresponding object in state.
   * @returns {object} Updated input data object to be saved in state.
   */
  static tryToMakeInvalid(name, item) {
    const error = ContactForm.isValid(name, item);
    if (error !== undefined) {
      // Input is invalid. Save the error
      return { ...item, error };
    }
    return item;
  }


  /**
   * Checks if entire form is valid.
   * @returns {bool} Whether or not the form is valid.
  */
  static formIsValid(state) {
    // Which state fields do we check for errors
    const allowed = ['firstName', 'lastName', 'email', 'subject', 'message'];

    // Loop through above state fields and see if they have an error.
    for (let i = 0; i < Object.entries(state).length; i += 1) {
      // Get key and value from state
      const entry = Object.entries(state)[i];
      const key = entry[0];

      // Only use state entries that belong in the message to be sent
      if (allowed.includes(key)) {
        const content = entry[1];
        const { error } = content;
        // If an error is found, return false.
        if (error) return false;
      }
    }

    // No errors were found. Form is valid!
    return true;
  }


  constructor(props) {
    super(props);
    this.state = newState;
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.handleError = this.handleError.bind(this);
  }


  handleError(errorText) {
    // Server did not respond.
    const currentState = {
      ...this.state,
      response: {
        status: 'error',
        error: errorText,
      },
      isSending: false,
    };
    this.setState(currentState);

    // Report error to analytics
    const event = {
      category: 'Contact Form',
      action: 'Sending error',
      label: errorText,
    };
    this.props.analytics(event);
  }


  /**
   * Handle changes in inputs. Tries to validate inputs and updates state.
   * @param {object} event Change event that was fired
   */
  handleChange(event) {
    // Get name and value from the event.
    const { name, value } = event.target;

    // Update value
    let newItem = { ...this.state[name], value };

    // Validate input, trying to remove any error messages that were present.
    newItem = ContactForm.tryToMakeValid(name, newItem);

    // Initialize an object that will eventually become the new state.
    const changedState = { ...this.state, [name]: newItem };

    // Check if new state of entire form is valid.
    let isValid = false;
    let { hasFilledForm } = this.state;
    if (ContactForm.formIsValid(changedState)) {
      isValid = true;

      // Has the form been filled previously? If not, change state entry and send analytics event.
      if (!hasFilledForm) {
        hasFilledForm = true;

        // Tell analytics the form was filled successfully
        const analyticsEvent = {
          category: 'Contact Form',
          action: 'Filled form',
        };
        this.props.analytics(analyticsEvent);
      }
    }

    // Update state
    this.setState({
      ...changedState,
      isValid,
      hasFilledForm,
    });
  }


  /**
   * Handle blurring of inputs. Tries to invalidate inputs and updates validation errors into state.
   * @param {object} event Blur event that was fired
   */
  handleBlur(event) {
    // Get name from the event, value from state.
    const { name } = event.target;
    let newItem = this.state[name];

    // Validate input's value. An error message is added if the input is invalid.
    newItem = ContactForm.tryToMakeInvalid(name, newItem);

    // Mark that this item was touched
    newItem = { ...newItem, touched: true };

    // Initialize an object that will eventually become the new state.
    const changedState = { ...this.state, [name]: newItem };

    // Check if new state of entire form is invalid.
    let isValid = true;
    if (!ContactForm.formIsValid(changedState)) {
      isValid = false;
    }

    // Update state
    this.setState({
      ...changedState,
      isValid,
    });
  }


  /**
   * Sends form data to email service.
   */
  handleMail() {
    // Disable send button
    this.setState({
      ...this.state,
      isSending: true,
    });

    // Build an object from the form's data.
    // Some kind of client-side sanitation could happen here.
    const formData = {};
    const allowed = ['firstName', 'lastName', 'email', 'subject', 'message'];
    for (let i = 0; i < Object.entries(this.state).length; i += 1) {
      // Get key and value from state
      const entry = Object.entries(this.state)[i];
      const key = entry[0];

      // Only use state entries that belong in the email
      if (allowed.includes(key)) {
        const content = entry[1];
        const { value } = content;

        // Add key-value pair to formData
        formData[key] = value;
      }
    }

    /**
     * Debug function for testing sending message behaviour.
     * Makes message submission randomly succeed or fail after 2 seconds.
     */
    // const response = Math.random() > 0.5 ?
    //   { status: 'ok' } :
    //   {
    //     status: 'error',
    //     error: 'This is a dummy error that intentionally occurs 50% of the time',
    //   };

    // return setTimeout(() => {
    //   this.setState({ ...newState, response, isSending: false });
    // }, 2000);

    // Send email
    sendMail(formData)
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((data) => {
              // Sending was OK and response data was successfully parsed.
              this.setState({ ...newState, response: data, isSending: false });
              // Report success to analytics
              const event = {
                category: 'Contact Form',
                action: 'Sending success',
              };
              this.props.analytics(event);
            })
            .catch(() => {
              // Could not parse response as JSON. Create an error in state.
              this.handleError('Could not parse response as JSON');
            });
        } else {
          // Server did not respond with 200. Create an error.
          this.handleError('Did not receive 200 from remote');
        }
      })
      .catch(() => {
        // Server did not respond.
        this.handleError('No response from remote');
      });
  }


  render() {
    const { isValid } = this.state;

    return (
      <div className="container">
        <Paper className="ContactForm">
          <div className="formInputs">
            <h2>Contact Us</h2>
            <div className="halfWidth">
              <TextField
                value={this.state.firstName.value}
                hintText="Matthew"
                floatingLabelText="First Name"
                name="firstName"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                errorText={this.state.firstName.touched ? this.state.firstName.error : ''}
                disabled={this.state.isSending}
                fullWidth
              />
            </div>
            <div className="halfWidth">
              <TextField
                value={this.state.lastName.value}
                hintText="Jackson"
                floatingLabelText="Last Name"
                name="lastName"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                errorText={this.state.lastName.touched ? this.state.lastName.error : ''}
                disabled={this.state.isSending}
                fullWidth
              />
            </div>
            <TextField
              value={this.state.email.value}
              hintText="matthew@thejacksons.com"
              floatingLabelText="Email Address"
              name="email"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              type="email"
              errorText={this.state.email.touched ? this.state.email.error : ''}
              disabled={this.state.isSending}
              fullWidth
            />
            <TextField
              value={this.state.subject.value}
              hintText="What my message is about"
              floatingLabelText="Subject"
              name="subject"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              errorText={this.state.subject.touched ? this.state.subject.error : ''}
              disabled={this.state.isSending}
              fullWidth
            />
            <TextField
              value={this.state.message.value}
              hintText="My message to the Cameramakers team"
              floatingLabelText="Message"
              name="message"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              errorText={this.state.message.touched ? this.state.message.error : ''}
              disabled={this.state.isSending}
              fullWidth
              multiLine
            />

            <div className="sendButton">
              <RaisedButton
                label={this.state.isSending ? 'Sending...' : 'Send'}
                primary
                onClick={this.handleMail}
                disabled={!isValid || this.state.isSending}
              />
            </div>

            {this.state.isSending ?
              <Paper className="loadingIcon" zDepth={2}>
                <CircularProgress size={80} thickness={5} />
                <p>Sending message...</p>
              </Paper>
            : null }
          </div>

          <FormResult response={this.state.response} />
        </Paper>
      </div>
    );
  }
}

ContactForm.propTypes = {
  analytics: PropTypes.func,
};

ContactForm.defaultProps = {
  analytics: null,
};

export default ContactForm;
