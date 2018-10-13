import React from 'react'
import {loginWithoutLoginPage} from '../utils/api.js'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <button onClick = {loginWithoutLoginPage}>
          Login
        </button>
      </div>
    )
  }
}

export default HomePage
