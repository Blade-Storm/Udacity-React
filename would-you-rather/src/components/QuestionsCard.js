import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const styles ={
    root: {
        minWidth: 275,
        marginBottom: 5,
        marginTop: 5,
    },
    avatar:{
        display: 'flex'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    question: {
        fontSize: 14,
    },
    title: {
        marginLeft: 15,
        paddingTop: 3
    },
    pos: {
        marginBottom: 12,
    }
}



class QuestionsCard extends Component{
    state={
        viewResults: false,
        answerPoll: false,
    }
    
    render(){
        const {questions, questionId, users} = this.props
        const {viewResults, answerPoll} = this.state

        return(
            <Fragment>
               
                    <Card style={styles.root} variant="outlined">
                        <CardContent>
                            <div style={styles.avatar}>
                                <Avatar alt={users[questions[questionId].author].name} src={users[questions[questionId].author].avatarURL} />
                                <Typography style={styles.title} variant="h5" component="h2">
                                
                                    {users[questions[questionId].author].name} asks:
                                </Typography>
                            </div>
                            <div>
                            <Typography style={styles.question} color="textSecondary" gutterBottom>
                                {questions[questionId].optionOne.text}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                OR
                            </Typography>
                            <Typography style={styles.question} color="textSecondary" gutterBottom>
                                {questions[questionId].optionTwo.text}
                            </Typography>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small">View Poll</Button>
                        </CardActions>
                    </Card>
 
            </Fragment>
            
            
        )
    }
}

function mapStateToProps({questions, users}, {questionId}){
    return{
        questions,
        users,
        questionId
    }
}


export default connect(mapStateToProps)(QuestionsCard)