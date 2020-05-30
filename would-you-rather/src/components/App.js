import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import SignIn from './SignIn';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import Questions from './Questions';
import NewQuestionsCard from './NewQuestionsCard'


/**
 * App component that holds the routing for the other major components ans shows the signin component if there isnt an authed user
 */
class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render(){
    const {authedUser,loading} = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          
            <div className="App">
            
            {authedUser === null
              ? <SignIn />

              : <div>
                  <Nav />
                  <Route path="/" exact component={Questions} />
                  <Route path="/questions/:id" component={Questions} /> 
                  <Route path="/new" component={NewQuestionsCard} />
                  <Route path="/leaderboard" component={Leaderboard} />
                </div>
            }
            
          
          </div>
  
          
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps({authedUser, loading}){ 
  return{
    authedUser,
    loading: authedUser = null
  }
}

export default connect(mapStateToProps)(App)