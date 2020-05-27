import {showLoading, hideLoading} from 'react-redux-loading'
import {getInitialData, getUsers} from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'
import {setAuthedUser} from '../actions/authedUser'

export function handleInitialData(){
    return(dispatch) => {
        dispatch(showLoading())
        
        return getInitialData()
            .then(({users,questions})=>{
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))

                dispatch(hideLoading())
            }).catch(() => {
                console.log("An error occured getting the initial data")
            })
    }
}

export function handleGetUsers(){
    return(dispatch) => {
        dispatch(showLoading())
        return getUsers().then(({users}) => {
            dispatch(receiveUsers(users))
            dispatch(hideLoading())
        })
    }
}