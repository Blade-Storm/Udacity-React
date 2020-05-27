import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA.js'

export function getInitialData(){
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    })).catch(()=>{
        console.log("An error occured getting the users and questions")
    })
}

export function getUsers(){
    return Promise.all([
        _getUsers(),
    ]).then(([users]) => ({users}))
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info){
    return _saveQuestionAnswer(info)
}