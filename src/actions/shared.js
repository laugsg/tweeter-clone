import { getInitialData } from '../utils/api'

import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = 'tylermcginnis'

// Asynchronous request : thunk pattern
export function handleInitialData(){
    return (dispatch) => {
        return getInitialData()
            .then(({users, tweets}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}