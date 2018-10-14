import React from 'react'
import {loginWithoutLoginPage, getUsers} from '../utils/api.js'
import Loading from './Loading'
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.user_check = this.user_check.bind(this);
    this.state = {
      logging_in : false,
    }
  }

  user_check() {
    console.log(getUsers())
  }

  onLoginClick() {
    this.setState({
      logging_in: true
    })
    const {history} = this.props
    loginWithoutLoginPage().then(function(res){
      if (res == 'logged_in') {
        history.push('/home')
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
        <React.Fragment>
        <button onClick = {this.onLoginClick}>
          Login
        </button>
        <button onClick = {this.user_check}>
          Users
        </button>
        </React.Fragment>
        )}
      </div>
    )
  }
}

export default HomePage
