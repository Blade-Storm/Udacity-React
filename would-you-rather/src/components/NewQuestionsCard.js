import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import {handleAddQuestion} from '../actions/questions'

const styles ={
    root: {
        minWidth: 275,
        marginBottom: 20,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    inputs: {
        width: "-webkit-fill-available"
    },
    submitBtn: {
        marginTop: 10,
        marginBottom: 10,
        float: "right"
    }
}

/**
 * NewQuestionsCard component for adding a new would you rather question
 */
class NewQuestionsCard extends Component{
    state={
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    /**
     * handleChange sets the value for the two questions that the user enters
     */
    handleChange = (event) => {
        const value = event.target.value
        if(event.target.id === 'option-one'){
            this.setState(() => ({
                optionOne: value
            }))
        }else{
            this.setState(() => ({
                optionTwo: value
            }))
        }
    }

    /**
     * handleSubmit adds the new question and redirects the user to the home tab
     */
    handleSubmit = (event) =>{
        event.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {dispatch, id} = this.props

        if(optionOne.trim() !== "" && optionTwo.trim() !== ""){
            dispatch(handleAddQuestion(optionOne, optionTwo))

            this.setState(() => ({
                optionOne: '',
                optionTwo: '',
                toHome: id ? false : true,
            }))
        }
    }

    render(){
        const {optionOne, optionTwo, toHome} = this.state

        if(toHome === true){
            return (
                <Redirect to="/" />
            )
        }


        return(
            <Container maxWidth="xs">
                <Card style={styles.root} variant="outlined">
                    <CardContent>
                        
                        <Typography variant="h5" component="h2">
                            Create a new question
                        </Typography>
                        <form style={styles.root} noValidate autoComplete="off">
                            <FormControl style={styles.inputs}>
                                <InputLabel htmlFor="option-one">Enter option one</InputLabel>
                                <Input id="option-one" value={optionOne} onChange={this.handleChange} />
                            </FormControl>
                            <Typography style={styles.title} color="textSecondary" gutterBottom>
                                OR
                            </Typography>
                            <FormControl style={styles.inputs}>
                                <InputLabel htmlFor="option-two">Enter option two</InputLabel>
                                <Input id="option-two" value={optionTwo} onChange={this.handleChange} />
                            </FormControl>
                            <Button style={styles.submitBtn} variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </form>
                        
                    </CardContent>

                </Card>
            </Container>
        )
    }
}

export default connect()(NewQuestionsCard)