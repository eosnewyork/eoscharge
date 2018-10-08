import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import ActionStore from './stores/ActionStore'
import AccountStore from './stores/AccountStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

configure({enforceActions: 'always'})

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

const app = 
  <MuiThemeProvider theme={theme}>
    <Provider actionStore={ActionStore} acctStore={AccountStore}>
      <App />
    </Provider>
  </MuiThemeProvider>

render(app, document.getElementById("root"))