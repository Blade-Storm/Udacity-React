import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import QuestionsCard from './QuestionsCard'


function TabPanel(props) {
    const { children, value, index, questions, unansweredQuestions, answeredQuestions, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {/**Unanswered Questions Tab Value = 0 */}
        {value === 0 && unansweredQuestions.map((key) => (
            <QuestionsCard key={key} questionId={key} toStats={false} viewPoll={false}/>
        ))}

        {/**Answered Questions Tab Value = 1 */}
        {value === 1 && answeredQuestions.map((key) => (
            <QuestionsCard key={key} questionId={key} toStats={false} viewPoll={false}/>
        ))}
      </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


class Questions extends Component{
    state={
        value: 0,
    }

    /** 
     * Handles the changing of the tabs. The user can select between:
     * Unanswered Questions Tab Value = 0
     * Answered Questions Tab Value = 1
     */
    handleChange = () =>{
        let newValue = null
        if(this.state.value === 0){
            newValue = 1
        }else{
            newValue = 0
        }

        this.setState(()=>({
            value: newValue
        }))
    }

    render(){
        const {value} = this.state
        const{questions, unansweredQuestions, answeredQuestions, viewPoll, toStats, questionId} = this.props


        let qid = questionId
        if(questionId === undefined && this.props.match !== undefined){
            qid = this.props.match.params.id
        }
        

        return(
            
                <Container maxWidth="xs">
                    {/**
                     * If viewPoll is false then we want to show the tab navigations for the unanswered and answered questions and their corresponding cards
                     */}
                    {viewPoll === false && (
                        <Fragment>
                        <AppBar position="static">
                            <Tabs value={value} onChange={this.handleChange} aria-label="Toggle between answered and unanswered questions">
                                <Tab label="Unanswered Questions"  {...a11yProps(0)}  />
                                <Tab label="Answered Questions"  {...a11yProps(1)}  />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0} questions={questions} unansweredQuestions={unansweredQuestions} answeredQuestions={answeredQuestions}>
                            Unanswered Questions
                        </TabPanel>
                        <TabPanel value={value} index={1} questions={questions} unansweredQuestions={unansweredQuestions} answeredQuestions={answeredQuestions}>
                            Answered Questions
                        </TabPanel>
                        </Fragment>
                    )}
                    {/**
                     * If viewPoll is true then we dont want to show the tab navigations for the unanswered and answered questions. We just want to show the card they chose to view
                     */}
                    {viewPoll && ( 
                         <QuestionsCard key={qid} questionId={qid} viewPoll={viewPoll} toStats={toStats}/>
                    )}
                </Container>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props){
    let answeredQuestions, unansweredQuestions = []
    // Keys of the answered questions
    answeredQuestions = Object.keys(users[authedUser].answers)
    // Keys of the unanswered questions
    unansweredQuestions = Object.keys(questions).filter(key => !answeredQuestions.includes(questions[key].id))

    let viewPoll = false
    if(props.viewPoll !== undefined){
        viewPoll = props.viewPoll
    }else if(props.match !== undefined && props.match.path === "/questions/:id"){
        viewPoll = true
    }

    return{
        questions,
        answeredQuestions,
        unansweredQuestions,
        authedUser,
        viewPoll
    }
}

export default connect(mapStateToProps)(Questions)