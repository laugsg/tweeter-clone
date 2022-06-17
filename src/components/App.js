import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

// Components
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        {
          this.props.loading === true
          ? null
          : <Dashboard />
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    loading: state.authedUser === null
  }
}

export default connect(mapStateToProps)(App)