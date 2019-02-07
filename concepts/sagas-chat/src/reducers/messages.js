import * as TYPES from '../types'

const initialState = []

const handleAddingMessage = (state, action) => {
    console.log('adding message', action.message)
    return [...state, action.message]
}

const messages = (state = initialState, action) => {
    const handlers = {
        [TYPES.ADD_MESSAGE]: handleAddingMessage,
        [TYPES.MESSAGE_RECEIVED]: handleAddingMessage,
    }
    return handlers[action.type] ? handlers[action.type](state, action) : state
}

export default messages
