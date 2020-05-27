import React, {Component} from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {setAuthedUser} from '../actions/authedUser'


class SignOut extends Component{
    handleSignOut =(e) =>{
        e.preventDefault()

        this.props.dispatch(setAuthedUser(null))
    }

    render(){
        const {user} = this.props
        return(
            <div>
                <p>Hello, {user.name}</p>
                <Avatar alt={user.name} src={user.avatarURL}/>
                <Button variant="contained" color="secondary" onClick={this.handleSignOut}>Sign out</Button>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return{
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(SignOut)