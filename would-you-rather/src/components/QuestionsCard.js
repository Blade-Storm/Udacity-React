import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import FormControl  from '@material-ui/core/FormControl'
import FormLabel  from '@material-ui/core/FormLabel'
import RadioGroup  from '@material-ui/core/RadioGroup'
import FormControlLabel  from '@material-ui/core/FormControlLabel'
import Radio  from '@material-ui/core/Radio'
import {handleSaveQuestionAnswer} from '../actions/questions'
import Questions from './Questions'
import Error from './Error'


const styles ={
    root: {
        minWidth: 275,
        marginBottom: 5,
        marginTop: 5,
    },
    avatar:{
        display: 'flex'
    },
    question: {
        fontSize: 14,
        color: "black"
    },
    questionStats: {
        fontSize: 14
    },
    title: {
        marginLeft: 15,
        paddingTop: 3
    },
    submitBtn: {
        float: "right"
    },
    viewPollBtn: {
        paddingTop: 0
    },
    viewQuestion: {
        marginTop: 16
    }
}


/**
 * QuestionsCard shows all of the varients of question information
 * 1. In the home screen when the user is viewing the unanswered questions (shows options and view poll button to answer the question)
 * 2. When the card is in the view poll state that allows the user to select and submit their response
 * 3. In the answered section of the home view which shows the user what they selected and the voting stats for that question
 */
class QuestionsCard extends Component{
    state={
        selectedAnswer: '',
        toStats: false
    }

    /**
     * when the user click the "View Poll" button we navigate to the questions/id and show the user just the question they selected
     * for them to answer it
     */
    toParent = (e, id) => {
        e.preventDefault()

        this.props.history.push(`questions/${id}`)
    }

    /**Submits the users selection for the question, then sets the state to show the results of that question */
    submitPoll= () =>{
        this.props.dispatch(handleSaveQuestionAnswer(this.state.selectedAnswer, this.props.questionId))
      
        this.setState(() => ({
            toStats: true,
        }))
    }

    /**
     * Handles the selecting of the radio buttons for the questions card
     */
    handleRadioChange = (value) => {
        this.setState(() => ({
            selectedAnswer: value
        }))
    }
    
    render(){
        const {questions, questionId, users, viewPoll, toStats, authedUser} = this.props
        let question = null


        // If the question doesnt exist then show the 404 error
        if(questions[questionId] === undefined){
            return (
                <Error />
            )
        }else{
            question = questions[questionId]
        }
       
        /**
         * If the toState state is true then the user just answered the question
         */
        if(this.state.toStats === true){
            // set viewPoll to true to show the just the card (done to remove the tabs for switching between answered and unanswered questions)
            return (
                <Questions questionId={questionId} viewPoll={true} toStats={true}/>
            )
        }

        return(
            <Fragment>
                {/**
                 * If viewPoll is true (clicked on the view poll button) and toStats is false then we need to let the user choose which question they would rather want
                 */}
                {viewPoll && !toStats && (
                    <Card style={styles.root} variant="outlined">
                        <CardContent>
                            <div style={styles.avatar}>
                                <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                <Typography style={styles.title} variant="h5" component="h2">     
                                    {users[question.author].name} asks:
                                </Typography>
                            </div>

                            <div>
                                <form onSubmit={(e) => this.submitPoll(e)}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Would you rather...</FormLabel>
                                        <RadioGroup aria-label="question" name="question" value={this.state.selectedAnswer} onChange={(e) => this.handleRadioChange(e.target.value)}>
                                            <FormControlLabel value={"optionOne"} control={<Radio />} label={question.optionOne.text} />
                                            <FormControlLabel value={"optionTwo"} control={<Radio />} label={question.optionTwo.text} />
                                        </RadioGroup>
                                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                                    </FormControl>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/**
                 * If viewPoll is true and toStats is true (answered the question) then we need to show the user the Results of that poll
                 */}
                {viewPoll && toStats && (
                    <Card style={styles.root} variant="outlined">
                        <CardContent>
                            <div style={styles.avatar}>
                                <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                <Typography style={styles.title} variant="h5" component="h2">     
                                    {users[question.author].name} asks:
                                </Typography>
                            </div>
                            {/**
                             * Show the results of the question
                             */}
                            <div>
                                {users[authedUser].answers[questionId] !== undefined &&
                                    <Typography variant="subtitle1" color="primary">
                                        You selected <b>{question[users[authedUser].answers[questionId]].text}</b>
                                    </Typography>
                                }
                                <Typography style={styles.question} color="textSecondary" gutterBottom>
                                    {question.optionOne.text}
                                </Typography>
                                <Typography style={styles.questionStats} color="textSecondary" gutterBottom>
                                    Votes: {question.optionOne.votes.length}
                                    <br />
                                    Percentage: {((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100).toFixed()}%
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    OR
                                </Typography>
                                <Typography style={styles.question} color="textSecondary" gutterBottom>
                                    {question.optionTwo.text}
                                </Typography>
                                <Typography style={styles.questionStats} color="textSecondary" gutterBottom>
                                    Votes: {question.optionTwo.votes.length}
                                    <br />
                                    Percentage: {((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100).toFixed()}%
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/**
                 * if viewPoll is false then show the card without the option for the user to choose but allow them to click on the view poll button to answer the question
                 */}
                {!viewPoll && (
                    <Card style={styles.root} variant="outlined">
                        <CardContent>
                            <div style={styles.avatar}>
                                <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                                <Typography style={styles.title} variant="h5" component="h2">
                                    {users[question.author].name} asks:
                                </Typography>
                            </div>

                            <div style={styles.viewQuestion}>
                                <Typography style={styles.question} color="textSecondary" gutterBottom>
                                    {question.optionOne.text}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    OR
                                </Typography>
                                <Typography style={styles.question} color="textSecondary" gutterBottom>
                                    {question.optionTwo.text}
                                </Typography>
                            </div>
                        </CardContent>

                        <CardActions  style={styles.viewPollBtn}>
                            <Button variant="contained" size="small" onClick={(e) => this.toParent(e, questionId)}>View Poll</Button>
                        </CardActions>
                    </Card>
                )}                
            </Fragment>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, {questionId, viewPoll, toStats} ){   


    return{
        questions,
        users,
        questionId,
        viewPoll,
        toStats,
        authedUser
    }
}


export default withRouter(connect(mapStateToProps)(QuestionsCard))