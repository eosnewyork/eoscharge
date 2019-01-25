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
    this.state = {
      network: 'eos',
    };
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }
  
  handleNetworkChange(network) {
    this.setState({
      network: network,
    });
    
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