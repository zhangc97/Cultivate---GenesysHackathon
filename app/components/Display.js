import React from 'react'
import handle_time from '../utils/handle_time.jpg'
import hold_time from '../utils/hold_time.jpg'
import inbound_calls from '../utils/inbound_calls.jpg'
import transfer_time from '../utils/transfer_time.jpg'

class Display extends React.Component {
  constructor(props){
    super(props);

  }
  render() {
    const {user_avgHtime, avgHandlingTime, user_avgHold, holdTime, user_intTrans, interactionsTransferred} = this.props
    const {user_inboundcall, inboundCalls} = this.props
    return(
    <React.Fragment>
      <div className = 'icon-container'>
        <div className = 'label-row'>
          <div className = 'stat-column'>
            <p style = {user_avgHtime <= avgHandlingTime ? {color:'green'} : {color:'red'}}>
              {user_avgHtime}
            </p>
            <img src = {handle_time} className = 'icon-image'></img>
            <p>
              Average Handling Time (seconds)
            </p>
            <p>
              {avgHandlingTime}
            </p>
          </div>
          <div className = 'stat-column'>
            <p style = {user_avgHold <= holdTime ? {color:'green'} : {color:'red'}}>
              {user_avgHold}
            </p>
            <img src = {hold_time} className = 'icon-image'></img>
            <p>
              Hold Time (seconds)
            </p>
            <p>
              {holdTime}
            </p>
          </div>
          <div className = 'stat-column'>
            <p style = {user_intTrans >= interactionsTransferred? {color:'green'} : {color:'red'}}>
              {user_intTrans}
            </p>
            <img src = {transfer_time} className = 'icon-image'></img>
            <p>
              Calls Transfered
            </p>
            <p>
              {interactionsTransferred}
            </p>
          </div>

        <div className = 'stat-column'>
            <p style = {user_inboundcall >= inboundCalls ? {color:'green'} : {color:'red'}}>
              {user_inboundcall}
            </p>
            <img src = {inbound_calls} className = 'icon-image'></img>
            <p>
              Inbound Calls Connected
            </p>
            <p>
              {inboundCalls}
            </p>
        </div>
      </div>

      </div>
      <div className = 'label-container'>
        <h1 style = {{fontSize: '36px'}}>
          Averages
        </h1>
      </div>
    </React.Fragment>
    )
  }
}

export default Display
