import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {addDeckInfo} from '../actions'
import {BasicButton} from './Buttons'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component{
    state = {
        answerValue: '',
        questionValue: ''
    }

    onChangeQuestionText = (question) => {
        this.setState(() => ({
            questionValue: question
        }))
    }

    onChangeAnswerText = (answer) => {
        this.setState(() => ({
            answerValue: answer
        }))
    }

    // Submit the new card to the deck
    submit = () => {
        // Dont allow empty values to be entered
        if(this.state.questionValue.trim() === "" || this.state.answerValue.trim() === ""){
            return
        }

        // Create the new card object
        let newCard = {
            question: this.state.questionValue,
            answer: this.state.answerValue
        }

        // Update the deck with the new card
        this.props.dispatch(addDeckInfo(this.props.deckTitle, newCard))
        addCardToDeck(this.props.deckTitle, newCard)

        // Clear the form
        this.setState(() => ({
            question: "",
            answer: ""
        }))

        // Navigate back
        this.props.navigation.navigate("DeckDetails", {title: this.props.deckTitle})
    }

    render(){
        const {answerValue, questionValue} = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Question</Text>
                <TextInput 
                    onChangeText={(text) => this.onChangeQuestionText(text)}
                    value={questionValue}
                    placeholder='Question'
                    style={styles.input}
                />

                <Text style={styles.title}>Answer</Text>
                <TextInput 
                    onChangeText={(text) => this.onChangeAnswerText(text)}
                    value={answerValue}
                    placeholder='Answer'
                    style={styles.input}
                />
            
                <BasicButton 
                        title="Submit" 
                        onPress={this.submit}
                        accessibilityLabel="Submit the new card for the deck"
                > Submit</BasicButton>
                
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginBottom: 15,
        fontSize: 30,
        textAlign: "center"
    },
    input: {
        width: "90%",
        padding: 15,
        alignSelf: "center", 
        marginBottom: 15,
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 2
    }
}

function mapStateToProps(state, {route, navigation}){
    return{
        deckTitle: route.params.deck
    }
}

export default connect(mapStateToProps)(AddCard)