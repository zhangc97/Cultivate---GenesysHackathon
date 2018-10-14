import React from 'react'
import {getUsers, getStats} from '../utils/api'
import Loading from './Loading'


class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users:[],
      loading: true,
      avgHandlingTime: null,
      holdTime: null,
      interactionsTransferred:null,
      inboundCalls:null,
    }
    this.retrieveUserData = this.retrieveUserData.bind(this)
  }
  componentWillMount(){
    const {users} = this.state
    getUsers().then(result => this.setState({users:result.data, loading:false}))
  }

  retrieveUserData(e,users){
    e.preventDefault()
    const {avgHandlingTime, holdTime, interactionsTransferred, inboundCalls} = this.state
    let avgHTime = []
    let Htime = []
    let interactionsTrans = []
    let incalls = []

    users.map((data) => {
      const userName = data.employeeID
      //getStats(userName, 'agent', 'AverageHandlingTime').then(result =>
      //  avgHTime.push(result.data.statistics.data.statistic.value.intervalLength)
      //)
      getStats(userName, 'agent', 'HoldDuration').then(result =>
        Htime.push(result.data.statistics.data.statistic.value.intervalLength))
/*
      getStats(userName, 'agent', 'InteractionTransferred').then(result =>
        interactionsTrans.push(result.data.statistics.data.statistic.value.intervalLength))

      getStats(userName, 'agent', 'InboundCalls').then(result =>
        incalls.push(result.data.statistics.data.statistic.value.intervalLength))
*/
    })
    console.log(avgHTime)
    console.log(Htime)
    //const sum0 = avgHTime.reduce((total, amount)=> total+amount)
    //sum0 = sum0/(avgHTime.length)
    //console.log(sum0)
  }

  render() {
    console.log(this.state.users)
    const {loading, users} = this.state

    return (
      <React.Fragment>
        {loading
          ?<Loading />
          : (
            <div>
              <React.Fragment>
                {users.map((data, id) => (
                    <div key = {id}>
                      {data.firstName}
                    </div>
                  ))
                }
              </React.Fragment>
              <button onClick = {(e) => this.retrieveUserData(e,users)}>
                Load Averages
              </button>
            </div>


          )

        }
      </React.Fragment>

    )
  }
}

export default MainPage
