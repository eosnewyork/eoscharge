import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Faq from './Faq'
import Disclaimer from './Disclaimer'
import Links from './Links'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Barlow Semi Condensed"',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      light: '#A4BDC3',
      main: '#1B5A6C',
      dark: '#3a93a5'
    },
    secondary: {
      main: '#A4BDC3'
    },
    text: {
      primary: '#323233',
      secondary: '#7B7D7D'
    },
    background: {
      paper: '#FFFFFF',
      default: '#EDEDED'
    }
  }
})

class App extends Component {
  
  constructor(props) {
    super(props);
    let net = "eos";
    let subdomain = window.location.host.toLowerCase().split(".")[0];
    if(! subdomain.startsWith(net) && ! subdomain.startsWith("localhost")) {
      net = subdomain;
    }
    this.state = {
      network: net,
    };
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  handleNetworkChange(network) {
    let urlPrefix = window.location.protocol + "//";
    let urlSuffix = window.location.host + window.location.pathname + window.location.search;
    let url = urlPrefix + urlSuffix;
    if ( network !== "eos") {
      url = urlPrefix + network + "." + urlSuffix;
    } 
    else {
      // remove subdomain if network is eos
      url = url.replace(this.state.network + ".", "")
    }
    this.setState({
      network: network,
    });
    window.location.replace(url);
  }

  render() {

    document.title = `${this.state.network.toUpperCase()} Charge`
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />            
        <Header handleNetworkChange={this.handleNetworkChange} network={this.state.network}/>
        <main>        
          <Route path="/" exact 
                 render={(props) => <Home {...props} network={this.state.network} />} />
          <Route path="/faq" component={Faq} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/links" component={Links} />
        </main>
        <Footer />      
      </MuiThemeProvider>
    )
  }
}

export default App