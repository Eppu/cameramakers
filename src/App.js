import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { grey900, deepOrange400 } from 'material-ui/styles/colors';

import ContactForm from './ContactForm';
import './App.css';

// Create a theme for material-ui
const muiTheme = getMuiTheme({
  fontFamily: 'Open Sans, Roboto, sans-serif',
  palette: {
    primary1Color: grey900,
    secondary1Color: deepOrange400,
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cameraCount: 0,
    };
    this.addCamera = this.addCamera.bind(this);
  }

  /**
   * Increase camera count by one
  */
  addCamera() {
    let { cameraCount } = this.state;
    cameraCount += 1;
    this.setState({ cameraCount });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <main className="center">
          <h1>Cameramakers</h1>
          <p>Cameras saved: {this.state.cameraCount}</p>
          <RaisedButton label="Repair a camera" primary onClick={this.addCamera} />
          <ContactForm />
        </main>
      </MuiThemeProvider>
    );
  }
}

export default App;
