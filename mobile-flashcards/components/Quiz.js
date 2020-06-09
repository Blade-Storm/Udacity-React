import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, Text, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Foundation} from '@expo/vector-icons'
import { white, grey } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/api'
import { BasicButton, TextButton } from './Buttons'


class Quiz extends Component{
    state = {
        numCorrect: 0,
        currentQuestion: 0,
        showAnswer: false,
        status: 'undetermined'
    }

    componentDidMount(){
        // When the user starts to take a Quiz clear the current notification and set a new one for tomorrow.
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted'){
                    clearLocalNotification()
                            .then(setLocalNotification)
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.warn('Error getting notification permission: ', error)

                this.setState(() => ({
                    status: 'undetermined'
                }))
            })
        
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted'){
                    setLocalNotification()
                }

                this.setState(() => ({status}))
            })
            .catch((error) => {
                console.warn('Error asking notification permission: ', error)

                this.setState(() => ({
                    status: 'undetermined'
                }))
            })
    }

    // Update the current question without changing the number of correct responses
    getNextQuestion = () =>{
        this.setState(() => ({
            currentQuestion: this.state.currentQuestion + 1
        }))
    }

    // Update the amount of correct questions, then get the next question
    incrementCorrect = () =>{
        this.setState(() => ({
            numCorrect: this.state.numCorrect + 1,
            currentQuestion: this.state.currentQuestion + 1
        }))
    }

    // Reset the state to start the quiz over
    startQuizOver = () => {
        this.setState(() => ({
            numCorrect: 0,
            currentQuestion: 0
        }))
    }

    // Toggle the showing of the question or answer
    showAnswer = () => {
        this.setState(() => ({
            showAnswer: !this.state.showAnswer
        }))
    }

    render(){
        const {deck, navigation} = this.props
        const {currentQuestion, numCorrect, status } = this.state

        // First check for notification permissions
        if(status === 'denied'){
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>You denied your notification access. You can fix this by visiting your settings and enabling notification services for this app</Text>
                </View>
            )
        }
        if(status === 'undetermined'){
            return(
                <View style={styles.center}>
                    <Foundation name='alert' size={50} />
                    <Text>You need to enable notification services for this app.</Text>

                    <TouchableOpacity onPress={this.askPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
        // If there are no questions in the deck, let the user know and give them a button to go back and add one
        if(deck.questions.length === 0){
            return (
                <View style={styles.noQuestionsContainer}>
                    <Text style={styles.noQuestionsText}>There are no questions in this deck. Go back and add some to start the quiz! </Text>

                    <BasicButton onPress={() => navigation.goBack()}>Go Back</BasicButton>
                </View>
            )
        }

        // If the current question (count) is equal to the decks questions count then show the results of the quiz
        if(this.state.currentQuestion === this.props.deck.questions.length){
            let resultText = ""
            if((numCorrect / this.props.deck.questions.length) > 0.75){
                resultText = "Congrats! You scored: "
            }else{
                resultText = "Nice try! You scored: "
            }
            return (
                <View style={{flex: 1}}>
                    <View style={styles.quizContent}>
                        <Text style={styles.resultText}>{resultText}</Text>
                        <Text style={styles.resultText}>{this.state.numCorrect} / {deck.questions.length}</Text>
                        <Text style={styles.resultText}>That's {Math.round((this.state.numCorrect / deck.questions.length) * 100)}%</Text>
                    </View>

                    <View style={styles.quizContent}>
                        <BasicButton onPress={this.startQuizOver}>Restart Quiz</BasicButton>
                        <BasicButton onPress={() => navigation.navigate("DeckDetails", {title: deck.title})}>Back to Deck</BasicButton>
                    </View>
                </View>
            )
        }

        // Show the quiz
        return (
            <View style={styles.quizContainer}>
                <View >
                    <Text style={styles.cardCount}> {this.state.numCorrect} / {deck.questions.length}</Text>
                </View>

               
                {this.state.showAnswer && (
                    <View style={styles.quizContent}>
                        <Text style={styles.questionText}> {deck.questions[currentQuestion].answer} </Text>
                    </View>
                )}
                {!this.state.showAnswer && (
                    <View style={styles.quizContent}>
                        <Text style={styles.questionText}> {deck.questions[currentQuestion].question} </Text>
                    </View>
                )}
                   
                <View style={styles.quizBtns}>
                    {this.state.showAnswer && (
                            <TextButton  onPress={this.showAnswer} style={{color: 'red'}}>Show Question</TextButton>
                    )}
                    {!this.state.showAnswer && (
                            <TextButton onPress={this.showAnswer} style={{color: 'red'}}>Show Answer</TextButton>
                    )}
                    <BasicButton onPress={this.incrementCorrect}>Correct</BasicButton>
                    <BasicButton onPress={this.getNextQuestion}>Incorrect</BasicButton>
                </View>
            </View>
        )
    }
}

const styles = {
    quizContainer: {
        flex: 1,
    },
    cardCount: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        color: grey,
        marginTop: 20,
    },
    noQuestionsContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    noQuestionsText: {
        fontSize: 20,
        color: grey,
        marginBottom: 10,
        width: '90%',
        textAlign: "center"
    },
    questionText: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        marginBottom: 30
    },
    quizContent: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center"
    },
    quizBtns: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center"
    },
    resultText: {
        fontSize: 20,
        color: grey
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    buttonText: {
        fontSize: 20
    },
}

function mapStateToProps(state, {route, navigation}){
    return{
        deck: state[route.params.title],
        navigation
    }
}

export default connect(mapStateToProps)(Quiz)