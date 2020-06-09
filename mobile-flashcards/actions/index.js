import {getDecks, deleteDeck} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_DECK_INFO = 'ADD_DECK_INFO'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks(){
    return (dispatch) => {
        getDecks()
          .then((decks) => {
            dispatch({
              type: RECEIVE_DECKS, 
              decks: decks
            })
          })
      }
}

export function addDeckTitle(deckTitle){
    return{
        type: ADD_DECK_TITLE, 
        deckTitle
    }
}

export function addDeckInfo(deck ,deckInfo){
    return {
        type: ADD_DECK_INFO,
        deck,
        deckInfo
    }
}

export function removeDeck(title){
    return{
        type: DELETE_DECK, 
        deckTitle: title
      }
}