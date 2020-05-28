import {RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION} from '../actions/questions'

export default function questions(state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.question.id]: action.question,
                
            }
        case SAVE_QUESTION:
            return{
                ...state,
            }
        default:
            return state
    }
}