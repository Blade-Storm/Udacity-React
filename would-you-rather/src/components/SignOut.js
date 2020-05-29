import React, {Component} from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import {setAuthedUser} from '../actions/authedUser'

const styles = {
    signOutBtn:{
        margin: 10
    },
    container:{
        float: "right",
        display: "flex"
    },
    name: {
        marginRight: 10
    },
    avatar:{
        alignSelf: "center"
    }
}


class SignOut extends Component{
    handleSignOut =(e) =>{
        e.preventDefault()

        this.props.dispatch(setAuthedUser(null))
    }

    render(){
        const {user} = this.props
        return(
            <div style={styles.container}>
                <p style={styles.name}>Hello, {user.name}</p>
                <Avatar style={styles.avatar} alt={user.name} src={user.avatarURL}/>
                <Button style={styles.signOutBtn} variant="contained" color="secondary" onClick={this.handleSignOut}>Sign out</Button>
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