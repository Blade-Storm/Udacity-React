import React, {Component} from 'react'
import { Button, View, Text, Animated } from 'react-native'
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
    state={
        opacity: new Animated.Value(0)
    }

    componentDidMount(){
        const {opacity} = this.state

        Animated.timing(opacity, {toValue: 1, duration: 1000}).start()
    }

    // Delete the deck
    // deleteDeck = (deckTitle) => {
    //     // Remove the deck from Redux and the Storage
    //     this.props.dispatch(removeDeck(deckTitle))
    //     deleteDeck(deckTitle)

    //     // Navigate back to the deck overview view
    //     this.toHome()
    // }

    toHome = () => {
        // Works only on web. Android error: "The action GO_BACK was not handled by any navigator. Is there anything to go back to?"
        // this.props.navigation.goBack()

        // Works only on web. Android error: "null is not an object (evaluating deckData.questions)"
        // this.props.navigation.navigate("New Deck")
        this.props.navigation.navigate("Decks")
        // this.props.navigation.dispatch(NavigationActions.back())

    }

    
    render(){
        const {opacity} = this.state
        const {deckData, navigation} = this.props
        if(deckData === undefined || deckData === null || Object.keys(deckData).length === 0){
            console.log("DECK DATA: ", deckData)
            this.toHome()
        }

        let cardCountText = deckData.questions.length === 1 ? "card" : "cards"
        
        return(
            
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Animated.Text style={[styles.title, {opacity}]}>{deckData.title}</Animated.Text>
                    <Animated.Text style={[styles.questionCount, {opacity}]}>{deckData.questions.length} {cardCountText}</Animated.Text>
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

    return {
        deckData:  state[title] !== undefined ? state[title] : null,
        navigation,
    }
}

export default connect(mapStateToProps)(DeckDetails)