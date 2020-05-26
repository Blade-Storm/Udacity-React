import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import SignIn from './SignIn';
import SignOut from './SignOut';
import Leaderboard from './Leaderboard';
import Questions from './Questions';


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render(){
    const {authedUser} = this.props
    return (
      <Fragment>
        <div className="App">
          {authedUser === null
            ? <SignIn />
            : <Questions />
          }
        
        </div>
      </Fragment>
    );
  }
}


function mapStateToProps({authedUser}){ 
  return{
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)