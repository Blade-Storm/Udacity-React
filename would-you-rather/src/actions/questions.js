import {showLoading, hideLoading} from 'react-redux-loading'
import {saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION' 
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText,
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

function questionAnswer(){
    return{
        type: SAVE_QUESTION,
    }
}

export function handleSaveQuestionAnswer(answer, qid){
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            answer,
            qid
        })
        .then(() => dispatch(questionAnswer()))
        .then(() => dispatch(hideLoading()))
    }
}