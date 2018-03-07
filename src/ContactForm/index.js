import Paper from 'material-ui/Paper';
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import sendMail from './sendMail';

import './ContactFormStyle.css';


// Error messages
const errorMessages = {
  emptyInput: 'Please enter a value.',
  invalidEmail: 'Email address is not valid',
};

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
  error: '',
  isSending: false,
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


  constructor(props) {
    super(props);
    this.state = newState;
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.handleMail = this.handleMail.bind(this);
  }


  /**
   * Resets state.
  */
  resetState() {
    this.setState(newState);
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

    // Update state
    this.setState({ [name]: newItem });
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

    // Update state
    this.setState({ [name]: newItem });
  }


  /**
   * Checks if entire form is valid.
   * @returns {bool} Whether or not the form is valid.
  */
  formIsValid() {
    const errors = Object.values(this.state).filter(item => item.error !== undefined);
    // If errors exist, form isn't valid.
    if (errors.length > 0) return false;
    return true;
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

    // Debug function for testing sending message behaviour
    return setTimeout(() => {
      this.resetState();
    }, 4000);

    // Send email
    sendMail(formData)
      .then((res) => {
        res.json()
          .then((data) => {
            console.log(data);
            this.resetState();
          })
          .catch(() => console.error(new Error('Could not parse response as JSON')));
      })
      .catch(() => console.error('Did not receive a response from remote'));
  }


  render() {
    return (
      <div>
        <Paper className="ContactForm">
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
            hintText="Message subject"
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
            hintText="Message to the Cameramakers team"
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
              disabled={!this.formIsValid() || this.state.isSending}
            />
          </div>

          {this.state.isSending ?
            <Paper className="loadingIcon" zDepth={2}>
              <CircularProgress size={80} thickness={5} />
              <p>Sending message...</p>
            </Paper>
          : null }
        </Paper>
      </div>
    );
  }
}

export default ContactForm;
