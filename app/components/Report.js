import React from 'react'

class Report extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  static getDerivedStateFromProps(props,state){
    if (props.button_data !== state.data){
      return {
        data: props.button_data
      }
    }
    return null;
  }

  render() {
    //console.log(this.props)
    const {data} = this.state
    const {history} = this.props
    console.log(data)
    return (
      <div className = 'report-container'>
        <div className = 'label-row'>
          Keep an eye on the following people
        </div>
        <div className = 'label-row-wrap'>
          {data.map((result, id)=> (
            <h1 key = {id}>
              {result}
            </h1>
          ))}
        </div>
        <button className = 'btn' onClick = {() => history.push('/home/display')}>
          back
        </button>
      </div>
    )
  }
}

export default Report
