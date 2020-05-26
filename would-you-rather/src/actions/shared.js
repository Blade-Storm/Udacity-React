import {showLoading, hideLoading} from 'react-redux-loading'
import {getInitialData} from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'
import {setAuthedUser} from '../actions/authedUser'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData(){
    return(dispatch) => {
        dispatch(showLoading())
        
        return getInitialData()
            .then(({users,questions})=>{
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                // dispatch(setAuthedUser(AUTHED_ID))

                dispatch(hideLoading())
            }).catch(() => {
                console.log("An error occured getting the initial data")
            })
    }
}