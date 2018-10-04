import React from 'react'
import { render } from 'react-dom'
import App from "./containers/App"
import { configure } from 'mobx'
import { Provider } from "mobx-react"
import ActionStore from "./stores/ActionStore"
import AccountStore from "./stores/AccountStore"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

configure({enforceActions: 'always'})

if (process.env.NODE_ENV !== 'production') {
  //const {whyDidYouUpdate} = require('why-did-you-update');
  //whyDidYouUpdate(React);
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Barlow Semi Condensed"',
      'sans-serif'
    ].join(','),
  },
})

const app = 
  <MuiThemeProvider theme={theme}>
    <Provider actionStore={ActionStore} acctStore={AccountStore}>
      <App />
    </Provider>
  </MuiThemeProvider>

render(app, document.getElementById("root"))