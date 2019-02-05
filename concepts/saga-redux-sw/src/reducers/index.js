import { combineReducers } from 'redux'
import * as TYPES from '../types/TYPES'

const initialState = {
    people: [],
    planet: [],
}

const handleStarWarsFetchSuccess = (state, action) => {
    return {
        ...state,
        people : action.data,
    }
}

const handleStarWarsFetchPlanetSuccess = (state, action) => {
    return {
        ...state,
        planet : action.data,
    }
}

const handleQueueSuccess = (state, action) => {
    console.log('handleQueueSuccess reducer')
    return {
        ...state,
        count : action.data,
    }
}

const starWars = (state = initialState, action) => {
    const handlers = {
        [TYPES.FETCH_STAR_WARS_SUCCESS]: handleStarWarsFetchSuccess,
        [TYPES.FETCH_STAR_WARS_PLANET_SUCCESS]: handleStarWarsFetchPlanetSuccess,
        [TYPES.QUEUE_CHANNEL_SUCCESS]: handleQueueSuccess,
    }
    return handlers[action.type]
        ? handlers[action.type](state, action)
        : state
}

const rootReducer = combineReducers({
    starWars,
})

export default rootReducer