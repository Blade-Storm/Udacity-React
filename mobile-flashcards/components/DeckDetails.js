import React, {Component} from 'react'
import { Button, View, Text, Animated } from 'react-native'
import {connect} from 'react-redux'
import {TextButton,BasicButton} from './Buttons'
import { deleteDeck} from '../utils/api'
import { removeDeck } from '../actions'
import {grey, red} from '../utils/colors'


/**
 * Component for the details of the deck where the user can 
 * 1. Start the quiz
 * 3. Add a question to the deck
 * 4. Displays the decks details
 */
class DeckDetails extends Component{
    state={
        opacity: new Animated.Value(0)
    }

    componentDidMount(){
        const {opacity} = this.state

        Animated.timing(opacity, {toValue: 1, duration: 1000}).start()
    }
    
    render(){
        const {opacity} = this.state
        const {deckData, navigation} = this.props

        let cardCountText = deckData.questions.length === 1 ? "card" : "cards"
        
        return(
            
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Animated.Text style={[styles.title, {opacity}]}>{deckData.title}</Animated.Text>
                    <Animated.Text style={[styles.questionCount, {opacity}]}>{deckData.questions.length} {cardCountText}</Animated.Text>
                </View>
                
                <View style={{flex: 1, justifyContent: "flex-end", width: "100%"}}>
                    <BasicButton 
                        title="Add Card" 
                        onPress={() => navigation.navigate("AddCard", {deck: deckData.title})}
                    > Add Card</BasicButton>
                    <BasicButton 
                        title="Start Quiz" 
                        onPress={() => navigation.navigate("Quiz", {title: deckData.title})}
                    > Start Quiz</BasicButton>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    textContainer: {
        justifyContent: 'flex-end',
        marginBottom: 50,
        flex: 1
    },
    title: {
        textAlign: "center",
        fontSize: 30
    },
    questionCount: {
        fontSize: 20,
        color: grey,
        textAlign: "center"
    }
}

function mapStateToProps(state, {route, navigation}){
    const title = route.params.title !== undefined ? route.params.title : null

    return {
        deckData:  state[title] !== undefined ? state[title] : null,
        navigation,
    }
}

export default connect(mapStateToProps)(DeckDetails)