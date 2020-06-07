import React, {Component} from 'react'
import { Button, View, Text } from 'react-native'
import {connect} from 'react-redux'
import {TextButton,BasicButton} from './Buttons'
import { deleteDeck} from '../utils/api'
import { removeDeck } from '../actions'
import {grey, red} from '../utils/colors'
import DeckOverview from '../components/DeckOverview'


/**
 * Component for the details of the deck where the user can 
 * 1. Start the quiz
 * 2. Delete the deck
 * 3. Add a question to the deck
 * 4. Displays the decks details
 */
class DeckDetails extends Component{

    // Delete the deck
    deleteDeck = (deckTitle) => {
        // Remove the deck from Redux and the Storage
        this.props.dispatch(removeDeck(deckTitle))
        deleteDeck(deckTitle)
    }

    
    render(){
        const {deckData, navigation} = this.props
        if(deckData === null){
            navigation.navigate("Decks")
        }

        let cardCountText = deckData.questions.length === 1 ? "card" : "cards"

        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{deckData.title}</Text>
                    <Text style={styles.questionCount}>{deckData.questions.length} {cardCountText}</Text>
                </View>
                
                <View style={{flex: 1, justifyContent: "flex-end", width: "100%"}}>
                    <TextButton 
                        title="Delete Deck" 
                        onPress={() => this.deleteDeck(deckData.title)} 
                        style={{color: red}}
                    > Delete Deck</TextButton>
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
    console.log("MSTP TITLE: ", title)
    console.log("MSTP DECK: ", state[title])

    return {
        deckData:  state[title] !== undefined ? state[title] : null,
        navigation,
    }
}

export default connect(mapStateToProps)(DeckDetails)