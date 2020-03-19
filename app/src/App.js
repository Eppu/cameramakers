import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GA from 'react-ga';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900, deepOrange400 } from 'material-ui/styles/colors';
import { RaisedButton } from 'material-ui';
import sizeMe from 'react-sizeme';
import PropTypes from 'prop-types';

// Custom components
import ContactForm from './ContactForm';
import Footer from './Footer';
import FullWidthImage from './FullWidthImage';
import Header from './Header';
import MultiColumn from './MultiColumn';
import Shelf from './Shelf';
import TitleImage from './TitleImage';

// Assets
import Ari from './assets/img/team/ari.jpg';
import DocPhoto from './assets/img/doc_banner.png';
import FullLogoBlack from './assets/img/logo/black/CM_Basic_Black_Rgb.svg';
import FullLogoGold from './assets/img/logo/gold/CM_Basic_Gold_Rgb.svg';
import Jukka from './assets/img/team/jukka.jpg';
import Logo from './assets/img/logo/black/CM_ID_Black_Rgb.svg';
import Mika from './assets/img/team/mika.jpg';
import TeamPhoto from './assets/img/team/team_2019.jpg';
import Toni from './assets/img/team/toni.jpg';
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
  /**
   * Sends analytics events to Google Analytics
   * @param {object} event Analytics event to send
   */
  static analyticsEvent(event) {
    if (event) {
      GA.event(event);
      return true;
    }
    return false;
  }


  constructor(props) {
    super(props);
    this.state = {
      shelfSelected: Math.floor(Math.random() * 2),
    };
    this.handleShelfSelect = this.handleShelfSelect.bind(this);

    // Initialize Google Analytics and send a pageview.
    GA.initialize('UA-54570195-6');
    GA.pageview(window.location.pathname + window.location.search);
  }


  /**
   * Handles selection of ShelfItems.
   * @param {number} selected Index of selected ShelfItem
   */
  handleShelfSelect(shelfSelected) {
    this.setState({
      ...this.state,
      shelfSelected,
    });

    // Which cameramaker was clicked?
    const cameramakers = ['Mika', 'Jukka', 'Ari', 'Toni'];
    // Send an analytics event
    const label = cameramakers[shelfSelected] ? cameramakers[shelfSelected] : null;
    const event = {
      category: 'Main',
      action: 'Select Cameramaker',
      label,
    };
    App.analyticsEvent(event);
  }


  render() {
    const { shelfSelected } = this.state;
    const { width } = this.props.size;

    const isDesktop = width > 700;
    const isMobile = width > 400 && width <= 700;

    let shelfHeight = 100;
    if (isMobile) shelfHeight = 200;
    if (isDesktop) shelfHeight = 500;

    // Show the correct text content based on what is selected on the Cameramakers shelf.
    let shelfText = '';
    switch (shelfSelected) {
      case 0:
        shelfText = (
          <div>
            <h3>Mika Parviainen</h3>
            <div className="leftBorder">
              <p className="left">
                Mika came to Kameratori from a leading role at the official Nikon and Canon
                service center in Helsinki. He has been servicing cameras for 14 years and handles
                most of the AF equipment we have going through.
              </p>
            </div>
          </div>
        );
        break;
      case 1:
        shelfText = (
          <div>
            <h3>Jukka Kelotie</h3>
            <div className="leftBorder">
              <p className="left">
                Jukka has been servicing high-end mechanical cameras for so long that he remembers
                when AF was a new thing.
                Trained in the factories of Sinar, Mamiya and Konica, he is one of
                the few remaining original master cameramakers.
                With decades of experience at importer service centers for brands including
                Leica, Linhof, Plaubel and Ricoh, we are glad to have Jukka on board the
                Cameramakers team passing on his knowledge to future generations.
              </p>
            </div>
          </div>
        );
        break;
      case 2:
        shelfText = (
          <div>
            <h3>Ari Yli-Hukkala</h3>
            <div className="leftBorder">
              <p classNamer="left">
              Ari comes from a background of mechanical engineering, but he's also known to revive all sorts of old electronic devices.
              He is our rising star of Leica repairs. Putting endless hours in training with the smallest details of Leica bodies and lenses, we see a bright future ahead of him in the high end of mechanical repairs.
               
              </p>
            </div>
          </div>
        );
        break;
      case 3:
        shelfText = (
          <div>
            <h3>Toni Mattila</h3>
            <div className="leftBorder">
              <p classNamer="left">
              Toni has combined his tinkering skills with his passion for mechanical cameras and film photography. Always eager to learn more, he has a training in Mamiya cameras by Master Jukka, and also does Hasselblad, Nikon and Rollei service among others. 
              Toni feels cameras deserve quality maintenance and takes pride in fixing them with proper tools and knowledge.  
              </p>
            </div>
          </div>
        );
        break;
      default:
        shelfText = (
          <p>Select a cameramaker to learn more about them.</p>
        );
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <main className="center">
            <Header
              smallLogo={Logo}
              bigLogo={FullLogoBlack}
              isDesktop={isDesktop}
              analytics={App.analyticsEvent}
            />
            <TitleImage
              // title="Cameramakers"
              subtitle="Cultivating knowledge. Preserving cameras."
              logo={FullLogoGold}
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
                  Specialty analog camera repairs, training programs for new talents, and collection
                  of repair knowledge and spare parts.
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <h2>Who we are</h2>
                <p>
                  Cameramakers is a group of analog camera repair experts working under the roof of
                  Kameratori, the #1 used camera shop in the Nordics.
                </p>
              </MultiColumn>
            </div>

            <Shelf
              images={[Mika, Jukka, Ari, Toni]}
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
              <p>A brief history about our parent company in Finland</p>
              <a
                href="https://www.youtube.com/watch?v=KglgH5kPtkI"
                onClick={() => App.analyticsEvent({
                  category: 'Main',
                  action: 'Select link',
                  label: 'Kameratori 7 years video',
                })}
              >
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
                <RaisedButton
                  label="Share knowledge"
                  primary
                  href="#contact"
                  onClick={() => App.analyticsEvent({
                    category: 'Main',
                    action: 'Select action item',
                    label: 'Share knowledge',
                  })}
                />
                <p>
                  Do you have any knowledge of repair documentation that might be valuable
                  for the preservation of a camera type?
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <RaisedButton
                  label="Provide spare parts"
                  primary
                  href="#contact"
                  onClick={() => App.analyticsEvent({
                    category: 'Main',
                    action: 'Select action item',
                    label: 'Provide spare parts',
                  })}
                />
                <p>
                  Even broken or unwanted cameras are better in our hands than in the garbage!
                  We are constantly looking to grow our spare parts collection so that we can repair
                  cameras for decades to come.
                </p>
              </MultiColumn>
              <MultiColumn columns={3}>
                <RaisedButton
                  label="Contact us"
                  primary
                  href="#contact"
                  onClick={() => App.analyticsEvent({
                    category: 'Main',
                    action: 'Select action item',
                    label: 'Contact us',
                  })}
                />
                <p>
                  If you have any questions about our work, please do not hesitate to contact us.
                </p>
              </MultiColumn>
            </div>

            <div id="contact">
              <ContactForm analytics={App.analyticsEvent} />
            </div>
          </main>

          <Footer className="Footer">
            <h1 style={{ textAlign: isDesktop ? 'left' : 'center' }}>Cameramakers</h1>

            <MultiColumn
              columns={isDesktop ? 2 : 1}
              contentStyle={{ padding: 0 }}
            >
              <h2>Contact Information</h2>
              <p>info@cameramakers.com</p>
            </MultiColumn>

            {isDesktop ?
              <MultiColumn
                columns={2}
                contentStyle={{
                  padding: 0,
                  width: '100%',
                  maxWidth: '350px',
                  textAlign: 'left',
                  display: 'inline-block',
                }}
              >
                <img src={FullLogoGold} alt="Cameramakers logo" />
              </MultiColumn>
              : null
            }

            <MultiColumn
              columns={2}
              contentStyle={{ padding: 0 }}
            >
              <ul>
                <li style={{ fontWeight: 'bold' }}>Tampere</li>
                <li>Kyttälänkatu 1, 33100 Tampere</li>
                <li>+358 10 2311 770</li>
              </ul>
            </MultiColumn>

            <MultiColumn
              columns={2}
              contentStyle={{ padding: 0 }}
            >
              <ul>
                <li style={{ fontWeight: 'bold' }}>Helsinki</li>
                <li>Aleksis Kiven katu 17 A, 00510 Helsinki</li>
                <li>+358 10 2311 771</li>
              </ul>
            </MultiColumn>
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
