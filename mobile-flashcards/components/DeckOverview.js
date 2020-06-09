import React, {Component} from 'react'
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'

import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import DeckDetails from './DeckDetails'
import {white, grey, black} from '../utils/colors'

// Deck component to see the title, and question count for each deck in the default view
export function Deck({deckData, navigation}){
    let cardCountText = deckData.questions.length === 1 ? "card" : "cards"
    return (
        <View >
            <TouchableWithoutFeedback onPress={() => navigation.navigate("DeckDetails", {title: deckData.title})}>
                <View style={styles.deckContainer}>
                    <Text style={styles.deckTitle}>{deckData.title}</Text>
                    {}
                    <Text style={styles.deckCount}>{deckData.questions.length} {cardCountText}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

class DeckOverviewCard extends Component{
    render(){
        const {decks, navigation} = this.props
        
        
        // View for when there are no decks
        if(decks === undefined || decks === null || Object.keys(decks).length === 0){
            console.log("DECK OVERVIEW: ", decks)
            return (
                <View style={styles.noDecksContainer}>
                    <Text style={styles.noDecksText}>You don't have any Decks. Click on the New Deck tab to create one!</Text>
                </View>
            )
        }

        // View to display all of the Decks 
        return(
            <View style={styles.listContainer}>
                <FlatList 
                    data={Object.values(decks)}
                    renderItem={({item}) => <Deck deckData={item} navigation={navigation}/>}
                    keyExtractor={item => item.title}
                    style={styles.listContainer}
                />
            </View>
        )
    }
}

const styles = {
    listContainer: {
        flex: 1,
        alignContent: "center",
    },
    deckContainer:{
        backgroundColor: white,
        alignItems: "center",
        margin: 10,
    },
    deckTitle:{
        alignSelf: "center",
        paddingTop: 10,
        fontSize: 30
    },
    deckCount: {
        paddingBottom: 10,
        fontSize: 20,
        color: grey
    },
    noDecksContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    noDecksText:{
        fontSize: 20,
        color: grey,
        width: '90%',
        textAlign: "center"
    }
}

function mapStateToProps(decks, {route, navigation}){
    return {
        decks,
        navigation
    }
}

export default connect(mapStateToProps)(DeckOverviewCard)