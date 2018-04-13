import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900, deepOrange400 } from 'material-ui/styles/colors';
import { RaisedButton } from 'material-ui';
import sizeMe from 'react-sizeme';
import PropTypes from 'prop-types';

// Custom components
import Avatar from './Avatar';
import ContactForm from './ContactForm';
import Footer from './Footer';
import FullWidthImage from './FullWidthImage';
import Header from './Header';
import MultiColumn from './MultiColumn';
import Shelf from './Shelf';
import TitleImage from './TitleImage';

// Assets
import DocPhoto from './assets/doc_banner.png';
import FullLogo from './assets/cameramakers_logo_full.svg';
import Jaakko from './assets/jaakko.jpg';
import Jennina from './assets/jennina.jpg';
import Jukka from './assets/jukka.jpg';
import Kimmo from './assets/kimmo.jpg';
import Logo from './assets/cameramakers_logo.svg';
import Mika from './assets/mika.jpg';
import TeamPhoto from './assets/team_01.jpg';
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
  constructor(props) {
    super(props);
    this.state = {
      shelfSelected: Math.floor(Math.random() * 5),
    };
    this.handleShelfSelect = this.handleShelfSelect.bind(this);
  }


  /**
   * Handles selection of ShelfItems.
   * @param {number} selected Index of selected ShelfItem
   */
  handleShelfSelect(shelfSelected) {
    console.log('Selected ', shelfSelected);
    this.setState({
      ...this.state,
      shelfSelected,
    });
  }


  render() {
    const { shelfSelected } = this.state;
    const { width } = this.props.size;

    let shelfHeight = 100;
    if (width > 400) shelfHeight = 200;
    if (width > 700) shelfHeight = 500;

    // Show the correct text content based on what is selected on the Cameramakers shelf.
    let shelfText = '';
    switch (shelfSelected) {
      case 0:
        shelfText = (
          <div>
            <h3>Mika Parviainen</h3>
            <div className="leftBorder">
              <p className="left">
                Mika came to Kameratori from leading the Nikon and Canon official service center
                in Helsinki. He has been working servicing cameras for 14 years now and takes
                care of most of the AF stuff we have going through.
              </p>
            </div>
          </div>
        );
        break;
      case 1:
        shelfText = (
          <div>
            <h3>Kimmo Kujanpää</h3>
            <div className="leftBorder">
              <p className="left">
                Kimmo is the newest recruit to our service team. He is specialized in LF and
                TLR cameras.He also likes to tinker with electronic problems, as he is a fully
                qualified electrician and has been doing microelectronics for most of his
                career.
              </p>
            </div>
          </div>
        );
        break;
      case 2:
        shelfText = (
          <div>
            <h3>Jaakko Järvinen</h3>
            <div className="leftBorder">
              <p className="left">
                Jaakko is originally a watchmaker that graduated from the prestigious Finnish
                School of Watchmaking. With almost a decade of camera service experience he also
                benefited from having had the chance to study tricks under the instruction of
                the late Master Cameramaker Heikki Vatanen.
              </p>
            </div>
          </div>
        );
        break;
      case 3:
        shelfText = (
          <div>
            <h3>Jukka Kelotie</h3>
            <div className="leftBorder">
              <p className="left">
                Jukka was servicing high end mechanical cameras well before our founders were
                born. Schooled by the factories of Sinar, Mamiya and Konica + decades of
                experience at the importers service center for Leica, Linhof, Plaubel, Ricoh
                etc. Jukka is one of the few remaining original master cameramakers. We are
                glad to have him aboard passing his knowledge to the future generations through
                the Cameramakers team.
              </p>
            </div>
          </div>
        );
        break;
      case 4:
        shelfText = (
          <div>
            <h3>Jennina Terho</h3>
            <div className="leftBorder">
              <p className="left">
                Jennina is the soul of our Helsinki office. Central location brings a lot of
                foot traffic and queries through the door, but Jennina keeps the storefront and
                customers well in order. Jennina also co-ordinates the newly formed
                @cameramakers Instagram and in the future also manages the international
                service queries once Cameramakers gets that side ready for action.
              </p>
            </div>
          </div>
        );
        break;
      default:
        shelfText = (
          <p>Select a Cameramaker to learn more about them.</p>
        );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <main className="center">
            <Header smallLogo={Logo} bigLogo={FullLogo} />
            <TitleImage
              title="Cameramakers"
              subtitle="Cultivating knowledge. Preserving cameras."
              logo={FullLogo}
              cornerLogo={Logo}
            />

            <div className="summary">
              <MultiColumn columns={3}>
                <h2>What is a cameramaker?</h2>
                <p>
                  A cameramaker is a craftsman dedicated to sharing knowledge and preserving
                  mechanical cameras for generations to come.
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <h2>What we do</h2>
                <p>
                  Specialty analog camera repairs, training programs for new talents, spare parts
                  &amp; repair knowledge collection.
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <h2>Who we are</h2>
                <p>
                  Cameramakers is a group of analog camera repair experts working under the roof
                  of the Nordic&#39;s #1 used camera shop Kameratori.
                </p>
              </MultiColumn>
            </div>

            <div className="summary" id="cameramakers">
              <h2 className="sectionTitle">The Cameramakers</h2>
            </div>

            <Shelf
              images={[Mika, Kimmo, Jaakko, Jukka, Jennina]}
              height={shelfHeight}
              selected={shelfSelected}
              handleSelect={this.handleShelfSelect}
            />

            <div className="summary">
              <MultiColumn columns={1}>
                {shelfText}
              </MultiColumn>
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

            <div className="summary" id="action">
              <h2 className="sectionTitle">I would like to...</h2>
              <MultiColumn columns={3}>
                <RaisedButton label="Share knowledge" primary href="#contact" />
                <p>
                  Do you have any knowledge of repair documentation that might be valuable
                  for the preservation of a camera type?
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <RaisedButton label="Provide spare parts" primary href="#contact" />
                <p>
                  Even broken or unwanted cameras are better in our hands than in the garbage!
                  We are constantly looking to grow our spare parts collection so that we can repair
                  cameras for decades to come.
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <RaisedButton label="Get a repair quote" primary href="#contact" />
                <p>
                  Cameramakers excels in specialty analog camera gear repairs and is currently
                  only taking on such tasks.
                </p>
              </MultiColumn>
            </div>

            <div id="contact">
              <ContactForm />
            </div>
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
}

App.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    position: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
    }),
  }),
};

App.defaultProps = {
  size: { width: 0 },
};

export default sizeMe()(App);
