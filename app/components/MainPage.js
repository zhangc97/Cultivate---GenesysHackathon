import React from 'react'
import {getUsers, getStats} from '../utils/api'
import Loading from './Loading'
import {arrayAverage} from '../utils/tools'
import Dropdown from 'react-dropdown'
import '../utils/style.css'
import {BrowserRouter, withRouter, Switch, Route} from 'react-router-dom'
import Display from './Display'
import Report from './Report'
class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users:[],
      current_user: null,
      userIDs: [],
      loading: true,
      avgHandlingTime: null,
      holdTime: null,
      interactionsTransferred:null,
      inboundCalls:null,
      selectedOption: null,
      user_avgHtime: null,
      user_avgHold: null,
      user_intTrans: null,
      user_inboundcall: null,
      button_data: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.retrieveUserData = this.retrieveUserData.bind(this)
    this.belowAverageAHT = this.belowAverageAHT.bind(this)
    this.belowAverageHT = this.belowAverageHT.bind(this)
    this.belowAverageTT = this.belowAverageTT.bind(this)
    this.belowAverageIC = this.belowAverageIC.bind(this)
  }
  componentWillMount(){
    const {users} = this.state
    getUsers().then(result => this.retrieveUserData(result.data))
    getUsers().then(result => this.setState({users:result}))
  }

  retrieveUserData(users){
    //e.preventDefault()
    const {avgHandlingTime, holdTime, interactionsTransferred, inboundCalls} = this.state
    let avgHTime = []
    let Htime = []
    let interactionsTrans = []
    let incalls = []
    let userIDs = []
    this.setState({
      loading: true
    })
    users.map((data) => userIDs.push(data.employeeID))
    users.map((data) => {
      const userName = data.employeeID
      getStats(userName, 'agent', 'AverageHandlingTime').then(result =>
        avgHTime.push(result.data.statistics.data.statistic.value.intervalLength)
      )
    })
    users.map((data) => {
      const userName = data.employeeID
      getStats(userName, 'agent', 'HoldDuration').then(result =>
        Htime.push(result.data.statistics.data.statistic.value.intervalLength))
    })
    users.map((data) => {
      const userName = data.employeeID
      getStats(userName, 'agent', 'InteractionTransferred').then(result =>
        interactionsTrans.push(result.data.statistics.data.statistic.value.intValue))
    })
    users.map((data) => {
      const userName = data.employeeID
      getStats(userName, 'agent', 'InboundCalls').then(result =>
        incalls.push(result.data.statistics.data.statistic.value.intValue))
    })

    let average_avgHTime, average_Htime, average_interactionsTrans, average_incalls

    setTimeout(function() {
      average_avgHTime = arrayAverage(avgHTime)
      average_Htime = arrayAverage(Htime)
      average_interactionsTrans = arrayAverage(interactionsTrans)
      average_incalls = arrayAverage(incalls)
      this.setState({
        loading: false,
        avgHandlingTime: Math.round(average_avgHTime),
        holdTime: Math.round(average_Htime),
        interactionsTransferred: Math.round(average_interactionsTrans),
        inboundCalls: Math.round(average_incalls),
        userIDs: userIDs
      })
    }.bind(this), 6000)
  }

  handleChange = (selectedOption) => {
    const {users, current_user} = this.state
    users.data.map((data) => {
      if (data.employeeID == selectedOption.value){
        this.setState({
          current_user: data
        })
      }
    })

    this.setState({selectedOption})
    getStats(selectedOption.value, 'agent', 'AverageHandlingTime').then(result =>
      this.setState({user_avgHtime: Math.round(result.data.statistics.data.statistic.value.intervalLength)}))
    getStats(selectedOption.value, 'agent', 'HoldDuration').then(result =>
      this.setState({user_avgHold: Math.round(result.data.statistics.data.statistic.value.intervalLength)}))
    getStats(selectedOption.value, 'agent', 'InteractionTransferred').then(result =>
      this.setState({user_intTrans: Math.round(result.data.statistics.data.statistic.value.intValue)}))
    getStats(selectedOption.value, 'agent', 'InboundCalls').then(result =>
      this.setState({user_inboundcall: Math.round(result.data.statistics.data.statistic.value.intValue)}))
  }

  belowAverageAHT() {
    const {users, avgHandlingTime} = this.state
    let belowAverage = []
    users.data.map((data) => {
      let userName = data.employeeID
      getStats(userName, 'agent', 'AverageHandlingTime').then(result => {
        if(result.data.statistics.data.statistic.value.intervalLength > avgHandlingTime){
          belowAverage.push(userName)
        }
      })
    })
    setTimeout(function() {
      this.setState({
        button_data: belowAverage
      }, ()=> this.props.history.push('/home/report'))
    }.bind(this), 1500)
  }
  belowAverageHT() {
    const {users, holdTime} = this.state
    let belowAverage = []
    users.data.map((data) => {
      let userName = data.employeeID
      getStats(userName, 'agent', 'HoldDuration').then(result => {
        if(result.data.statistics.data.statistic.value.intervalLength > holdTime){
          belowAverage.push(userName)
        }
      })
    })
    setTimeout(function() {
      this.setState({
        button_data: belowAverage
      }, ()=> this.props.history.push('/home/report'))
    }.bind(this), 1500)

  }

  belowAverageTT() {
    const {users, interactionsTransferred} = this.state
    let belowAverage = []
    users.data.map((data) => {
      let userName = data.employeeID
      getStats(userName, 'agent', 'InteractionTransferred').then(result => {
        if(result.data.statistics.data.statistic.value.intValue < interactionsTransferred){
          belowAverage.push(userName)
        }
      })
    })
    setTimeout(function() {
      this.setState({
        button_data: belowAverage
      }, ()=> this.props.history.push('/home/report'))
    }.bind(this), 1500)
  }

  belowAverageIC() {
    const {users, inboundCalls} = this.state
    let belowAverage = []
    users.data.map((data) => {
      let userName = data.employeeID
      getStats(userName, 'agent', 'InboundCalls').then(result => {
        if(result.data.statistics.data.statistic.value.intValue < inboundCalls){
          belowAverage.push(userName)
        }
      })
    })
    setTimeout(function() {
      this.setState({
        button_data: belowAverage
      }, ()=> this.props.history.push('/home/report'))
    }.bind(this), 1500)
  }

  render() {
    const {loading, selectedOption, users,userIDs, avgHandlingTime, holdTime, interactionsTransferred, inboundCalls} = this.state
    const {user_avgHtime, user_avgHold, user_intTrans, user_inboundcall,current_user, button_data} = this.state
    let options = userIDs
    //console.log(current_user)
    return (
      <React.Fragment>
        {loading
          ?<Loading />
          : (
            <React.Fragment>
            <div className = 'label-container'>
                <Dropdown
                  options = {options}
                  value = {selectedOption}
                  onChange = {this.handleChange}
                 />
            <div className = 'label-row'>
              <button onClick = {this.belowAverageAHT} className = 'btn'>
                Below Average Handling Times
              </button>
              <button onClick = {this.belowAverageHT} className = 'btn'>
                Below Average Hold Times
              </button>
              <button onClick = {this.belowAverageTT} className = 'btn'>
                Below Average Transfers
              </button>
              <button onClick = {this.belowAverageIC} className = 'btn'>
                Below Average Incoming Calls
              </button>
            </div>
            </div>
            <div className = 'title-container'>
              {current_user ? `${current_user.firstName} ${current_user.lastName} of ${current_user.agentGroups[0]}` : null}
            </div>

            <Switch>
              <Route path = '/home/display'
              render = {(props) =>
                <Display
                  {...props}
                  user_avgHtime = {user_avgHtime}
                  avgHandlingTime = {avgHandlingTime}
                  user_avgHold = {user_avgHold}
                  holdTime = {holdTime}
                  user_intTrans = {user_intTrans}
                  interactionsTransferred = {interactionsTransferred}
                  user_inboundcall = {user_inboundcall}
                  inboundCalls = {inboundCalls}
                />}
              />
              <Route exact path = '/home/report'
                render = {(props) =>
                  <Report
                    {...props}
                    button_data = {button_data}
                  />}
              />

            </Switch>

          </React.Fragment>

          )

        }
      </React.Fragment>

    )
  }
}

export default MainPage
