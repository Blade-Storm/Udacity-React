import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import {setAuthedUser} from '../actions/authedUser'

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

        this.props.dispatch(setAuthedUser(this.state.selectedUser))
    }


    render(){
        const {users} = this.props
        const {selectedUser} = this.state
        return(
            <Fragment>
                <Container maxWidth="xs">
                    <h2>Welcome to Would You Rather!</h2>
                    <p>Please select a user to sign in with.</p>

                    <h3>Sign in</h3>

                    <FormControl className={""}>
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

                        <Button variant="contained" color="primary" onClick={this.handleSetAuthedUser}>Submit</Button>
                    </FormControl>

                </Container>
            </Fragment>
    )
    }
}

function mapStateToProps({users}){
    return{
        users: users === null ? null : users
    }
}

export default connect(mapStateToProps)(SignIn)