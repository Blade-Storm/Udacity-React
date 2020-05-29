import React, {Component} from 'react'
import {connect} from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import {setAuthedUser} from '../actions/authedUser'

const styles = {
    card: {
        marginTop: 20
    },
    cardContent: {
        paddingBottom: 0
    },
    form: {
        display: "flex"
    },
    cardActions: {
        alignSelf: "flex-end",
        paddingRight: 0
    },
    header: {
        marginTop: 0
    }
}


class SignIn extends Component{
    state={
        selectedUser: ""
    }

    setSelectValue(value){
        this.setState(() => ({
            selectedUser: value
        }))
    }


    handleSetAuthedUser = (e) =>{
        e.preventDefault()
        if(this.state.selectedUser !== ""){
            this.props.dispatch(setAuthedUser(this.state.selectedUser))
        }
    }


    render(){
        const {users} = this.props
        const {selectedUser} = this.state
        return(
            <Container maxWidth="xs">
                <Card style={styles.card}>
                    <CardContent style={styles.cardContent}>
                        <span>
                            <h2 style={styles.header}>Welcome to Would You Rather!</h2>
                            <p>Please select a user to sign in with.</p>
                        </span>
                        <FormControl style={styles.form}>
                            <InputLabel id="signin-select-label">User</InputLabel>
                            
                            <Select
                                labelId="signin-select-label"
                                id="signin-select"
                                value={selectedUser}
                                onChange={e => this.setSelectValue(e.target.value)}
                            >

                                {/* Map over the users and use their names for the select list */}
                                {users !== null && Object.keys(users).map((key, index) => (
                                    <MenuItem value={users[key].id} key={users[key].id}>{users[key].name}</MenuItem>
                                ))}
                            
                            </Select>
                            
                            <CardActions style={styles.cardActions}>
                                <Button variant="contained" color="primary" onClick={this.handleSetAuthedUser}>Submit</Button>
                            </CardActions>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
    )
    }
}

function mapStateToProps({users}){
    return{
        users: users === null ? null : users
    }
}

export default connect(mapStateToProps)(SignIn)