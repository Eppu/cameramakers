import Paper from 'material-ui/Paper';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './ContactFormStyle.css';


// Error messages
const errorMessages = {
  emptyInput: 'Please enter a value.',
  invalidEmail: 'Email address is not valid',
};


class ContactForm extends React.Component {

  static isValid(name, item) {
    // Validate a single input
    if (!item.value.length > 0) {
      // Input is empty
      return errorMessages.emptyInput;
    }

    console.log(name);

    // Check if email is valid
    const mailFormat = /\S+@\S+\.\S/;
    if (name === 'email' && !item.value.match(mailFormat)) return errorMessages.invalidEmail;

    // Everything is valid
    return undefined;
  }


  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: '',
        touched: false,
        isValid: false,
        error: errorMessages.emptyInput,
      },
      lastName: {
        value: '',
        touched: false,
        isValid: false,
        error: errorMessages.emptyInput,
      },
      email: {
        value: '',
        touched: false,
        isValid: false,
        error: errorMessages.emptyInput,
      },
      subject: {
        value: '',
        touched: false,
        isValid: false,
        error: errorMessages.emptyInput,
      },
      message: {
        value: '',
        touched: false,
        isValid: false,
        error: errorMessages.emptyInput,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }


  handleChange(event) {
    // Update value and touched state
    const { name, value } = event.target;
    let newItem = { ...this.state[name], value, touched: true };

    // Validate value to get a potential error. Add error to object
    const error = ContactForm.isValid(name, newItem);
    newItem = { ...newItem, error };

    // Update state
    this.setState({ [name]: newItem });
  }


  formIsValid() {
    const errors = Object.values(this.state).filter(item => item.error !== undefined);
    // If errors exist, form isn't valid.
    if (errors.length > 0) return false;
    return true;
  }


  sendMail() {
    console.log(this.state);
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
              errorText={this.state.firstName.touched ? this.state.firstName.error : ''}
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
              errorText={this.state.lastName.touched ? this.state.lastName.error : ''}
              fullWidth
            />
          </div>
          <TextField
            value={this.state.email.value}
            hintText="matthew@thejacksons.com"
            floatingLabelText="Email Address"
            name="email"
            onChange={this.handleChange}
            type="email"
            errorText={this.state.email.touched ? this.state.email.error : ''}
            fullWidth
          />
          <TextField
            value={this.state.subject.value}
            hintText="Message subject"
            floatingLabelText="Subject"
            name="subject"
            onChange={this.handleChange}
            errorText={this.state.subject.touched ? this.state.subject.error : ''}
            fullWidth
          />
          <TextField
            value={this.state.message.value}
            hintText="Message to the Cameramakers team"
            floatingLabelText="Message"
            name="message"
            onChange={this.handleChange}
            errorText={this.state.message.touched ? this.state.message.error : ''}
            fullWidth
            multiLine
          />

          <div className="sendButton">
            <RaisedButton
              label="Send"
              primary
              onClick={this.sendMail}
              disabled={!this.formIsValid()}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default ContactForm;
