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
            <QuestionsCard key={key} questionId={key} />
        ))}

        {/**Answered Questions Tab Value = 1 */}
        {value === 1 && answeredQuestions.map((key) => (
            <QuestionsCard key={key} questionId={key}/>
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
        value: 0
    }

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
        const{questions, unansweredQuestions, answeredQuestions} = this.props

        return(
            <Fragment>
                <Container maxWidth="xs">
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
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps({questions, authedUser, users}){
    let answeredQuestions, unansweredQuestions = []
    // Keys of the answered questions
    answeredQuestions = Object.keys(users[authedUser].answers)
    // Keys of the unanswered questions
    unansweredQuestions = Object.keys(questions).filter(key => !answeredQuestions.includes(questions[key].id))


    return{
        questions,
        answeredQuestions,
        unansweredQuestions,
        authedUser
    }
}

export default connect(mapStateToProps)(Questions)