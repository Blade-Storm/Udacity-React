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

        this.props.navigation.navigate.goBack()
    }

    addCard = (deckTitle) => {
        this.props.navigation.navigate("AddCard", {deck: deckTitle})
    }

    startQuiz = () => {

    }

    
    render(){
        const {deckData, navigation} = this.props
        console.log("deckData: ",deckData)
        return(
            
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{deckData.title}</Text>
                    <Text style={styles.questionCount}>{deckData.questions.length} cards</Text>
                </View>
                
                <View>
                    <BasicButton 
                        title="Add Card" 
                        onPress={() => this.addCard(deckData.title)}
                    > Add Card</BasicButton>
                    <BasicButton 
                        title="Start Quiz" 
                        onPress={this.startQuiz()}
                    > Start Quiz</BasicButton>
                    <TextButton 
                        title="Delete Deck" 
                        onPress={() => this.deleteDeck(deckData.title)} 
                        style={{color: red}}
                    > Delete Deck</TextButton>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    textContainer: {
        marginBottom: 50
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
        deckData:  state[title],
        navigation,
    }
}

export default connect(mapStateToProps)(DeckDetails)