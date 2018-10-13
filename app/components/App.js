import React from 'react'
import {BrowserRouter, withRouter, Switch, Route} from 'react-router-dom'
import HomePage from './HomePage'
import MainPage from './MainPage'
class App extends React.Component {

  render() {
    return (
      <div className = 'main-container'>

        <Switch>
          <Route exact path = '/' component = {HomePage} />
          <Route path = '/authenticated' component = {MainPage} />
        </Switch>
      </div>
    )
  }
}

export default App
