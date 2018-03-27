import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900, deepOrange400 } from 'material-ui/styles/colors';

// Custom components
import Avatar from './Avatar';
import ContactForm from './ContactForm';
import Footer from './Footer';
import FullWidthImage from './FullWidthImage';
import ThreeColumn from './ThreeColumn';
import TitleImage from './TitleImage';

// Assets
import DocPhoto from './assets/doc_banner.png';
import TeamPhoto from './assets/team_01.jpg';
import Jaakko from './assets/jaakko.jpg';
import Jukka from './assets/jukka.jpg';
import Kimmo from './assets/kimmo.jpg';
import Mika from './assets/mika.jpg';
import './App.css';

// Create a theme for material-ui
const muiTheme = getMuiTheme({
  fontFamily: 'Open Sans, Roboto, sans-serif',
  palette: {
    primary1Color: grey900,
    secondary1Color: deepOrange400,
  },
});

function App() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <main className="center">
          <TitleImage
            title="Cameramakers"
            subtitle="Cultivating knowledge. Preserving cameras."
          />

          <div className="summary">
            <ThreeColumn
              title="What is a cameramaker?"
              text="A cameramaker is a craftsman dedicated to sharing knowledge and preserving
  mechanical cameras for generations to come."
            />
            <ThreeColumn
              title="What we do"
              text="Specialty analog camera repairs, training programs for new talents, spare parts
              &amp; repair knowledge collection."
            />
            <ThreeColumn
              title="Who we are"
              text="Cameramakers is a group of analog camera repair experts working under the roof
              of the Nordic's #1 used camera shop Kameratori."
            />
          </div>

          <FullWidthImage image={TeamPhoto}>
            <a href="https://www.youtube.com/watch?v=KglgH5kPtkI">
              <img
                src={DocPhoto}
                alt="Kameratori 7 years. Watch the documentary."
                className="clickable"
              />
            </a>
          </FullWidthImage>

          <Avatar image={Mika} size={200} />
          <Avatar image={Kimmo} size={200} />
          <Avatar image={Jaakko} size={200} />
          <Avatar image={Jukka} size={200} />

          <div className="summary">
            <ThreeColumn
              title="Share knowledge"
              text="Do you have any knowledge of repair documentation that might be valuable for
              the preservation of a camera type?"
              link="#"
            />
            <ThreeColumn
              title="Provide spare parts"
              text="Even broken or unwanted cameras are better in our hands than in the garbage!
              We are constantly looking to grow our spare parts collection so that we can repair
              cameras for decades to come."
              link="#"
            />
            <ThreeColumn
              title="Get a repair quote"
              text="Cameramakers excels in specialty analog camera gear repairs and is currently
              only taking on such tasks."
              link="#"
            />
          </div>

          <ContactForm />
        </main>

        <Footer className="Footer">
          <h2>Contact Information</h2>
          <ul>
            <li>info@kameratori.com</li>
            <li>Kyttälänkatu 1, 33100 Tampere</li>
            <li>010 2311777520</li>
          </ul>
        </Footer>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
