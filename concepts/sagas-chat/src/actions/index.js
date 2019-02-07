import * as TYPES from '../types/'
import { v4 as uuid } from 'uuid'

export const addMessage = (author, message) => {
    console.log('action', message)
    return {
        type: TYPES.ADD_MESSAGE,
        message: {
            id: uuid(),
            message: message,
            author,
        }
    }
}

export const addUser = name => ({
    type: TYPES.ADD_USER,
    user: {
        id: uuid(),
        name,
    }
})

export const messageReceived = (message, author) => ({
    type: TYPES.MESSAGE_RECEIVED,
    message: {
        id: uuid(),
        message,
        author,
    }
})

export const populateUsersList = users => ({
    type: TYPES.USER_LIST,
    users,
})
