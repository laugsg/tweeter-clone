import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS =   'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'


export function receiveTweets(tweets){
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function toggleTweet({id, authedUser, hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

// Async Action
export function handleToggleTweet(info){
    return (dispatch) => {
        // optimistic update
        dispatch(toggleTweet(info))
        
        return saveLikeToggle(info)
        .catch((e) => {
            console.warn('Error in handleToogleTweet:', e)
                dispatch(toggleTweet(info))
                alert('Error liking the Tweet. Please try again.')
            })
    }
}