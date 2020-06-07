import React, {Component} from 'react'
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'

import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import DeckDetails from './DeckDetails'
import {white, grey, black} from '../utils/colors'

// Deck component to see the title, and question count for each deck in the default view
export function Deck({deckData, navigation}){
    return (
        <View >
            <TouchableWithoutFeedback onPress={() => navigation.navigate("DeckDetails", {title: deckData.title})}>
                <View style={styles.deckContainer}>
                    <Text style={styles.deckTitle}>{deckData.title}</Text>
                    <Text style={styles.deckCount}>{deckData.questions.length} cards</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

class DeckOverviewCard extends Component{
    componentDidMount(){
        this.props.dispatch(receiveDecks())
    }

    render(){
        const {decks, navigation} = this.props

        // View for when there are no decks
        if(decks === undefined || decks === null){
            return (
                <View>
                    <Text>You don't have any Decks. Click on the New Deck tab to create one!</Text>
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
    }
}

function mapStateToProps(decks, {route, navigation}){
    return {
        decks,
        navigation
    }
}

export default connect(mapStateToProps)(DeckOverviewCard)