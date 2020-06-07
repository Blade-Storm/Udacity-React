import {AsyncStorage} from 'react-native'

const DECK_STORAGE_KEY = 'FlashCards:deck'

//  Return all of the decks along with their titles, questions, and answers.
export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {
        return data !== null ? JSON.parse(data) : null
    });
}

//  Take in a single id argument and return the deck associated with that id.
export function getDeck(id){
    return getDecks()
        .then((decks) => decks[id])
}

// Take in a single title argument and add it to the decks.
export function saveDeckTitle(deckTitle){
    // TODO: Before we add the new deck make sure one doesnt already exist
    const newDeck = {
        title: deckTitle,
        questions: []
    }

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({[deckTitle]: newDeck}))
}


/**
 * Take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
 */
export function addCardToDeck(deckTitle, newCard){
    // Get all of the decks and find the one we are adding the new card for. Merge the card with the found deck
    return getDecks()
        .then((decks) => {
            
            decks[deckTitle].questions.push(newCard)
            console.lop("OLD DECK: ", decks[deckTitle])
            AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks))
            
        })
}

// Delete a deck
export function deleteDeck(deckTitle){
   AsyncStorage.removeItem(DECK_STORAGE_KEY, deckTitle)
    
}