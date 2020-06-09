import {RECEIVE_DECKS, ADD_DECK_TITLE, ADD_DECK_INFO, DELETE_DECK} from '../actions'

function entries(state={}, action){
    // TODO: figure out why action.type can be "type": "@@redux/INITm.h.j.g.z.t", when I submit a new title
    switch(action.type){
        case RECEIVE_DECKS:
            return action.decks
        case ADD_DECK_TITLE:
            return {
                ...state,
                [action.deckTitle]: {
                    title: action.deckTitle,
                    questions: []
                }
            }
        case ADD_DECK_INFO:
            const updatedDeck = state[action.deck];
            updatedDeck.questions.push(action.deckInfo);
            return {
              ...state,
              [action.deck]: updatedDeck
            };
        case DELETE_DECK:
            let stateArr = Object.values(state)
            stateArr = stateArr.filter((deck) => deck.title !== action.deckTitle)

            if(stateArr === null || stateArr === []){
                return null
            }
            
            let newDeck = {}
            stateArr.forEach(item => newDeck[item.title] = item)
            return newDeck
            
        default: 
            return state
    }    
}

export default entries