import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
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
    }
}


class NewQuestionsCard extends Component{
    state={
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

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
            <Card styles={styles.root} variant="outlined">
                <CardContent>
                    
                    <Typography variant="h5" component="h2">
                        Create a new question
                    </Typography>
                    <form className={styles.root} noValidate autoComplete="off">
                        <FormControl>
                            <InputLabel htmlFor="option-one">Enter option one</InputLabel>
                            <Input id="option-one" value={optionOne} onChange={this.handleChange} />
                        </FormControl>
                        <Typography styles={styles.title} color="textSecondary" gutterBottom>
                            OR
                        </Typography>
                        <FormControl>
                            <InputLabel htmlFor="option-two">Enter option two</InputLabel>
                            <Input id="option-two" value={optionTwo} onChange={this.handleChange} />
                        </FormControl>
                    </form>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                </CardContent>

            </Card>
        )
    }
}

export default connect()(NewQuestionsCard)