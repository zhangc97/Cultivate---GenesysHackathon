import React from 'react'
import {loginWithoutLoginPage, getUsers} from '../utils/api.js'
import Loading from './Loading'
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.state = {
      logging_in : false,
    }
  }


  onLoginClick() {
    this.setState({
      logging_in: true
    })
    const {history} = this.props
    loginWithoutLoginPage().then(function(res){
      if (res == 'logged_in') {
        history.push('/home/display')
      }
    })
  }
  render() {
    const {logging_in} = this.state
    return (
      <div>
        {logging_in
        ? (<Loading />)
        : (
          <button onClick = {this.onLoginClick} className = 'btn'>
              Login
          </button>
        )
      }
      </div>
    )
  }
}

export default HomePage
