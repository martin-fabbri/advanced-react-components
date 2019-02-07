import * as TYPES from '../types'

const initialState = []

const handleAddUser = (state, action) => {
    return [...state, action.user]
}

const handlePopulateUsersList = (state, action) => {
    return action.users
}

const users = (state = initialState, action) => {
    const handlers = {
        [TYPES.ADD_USER]: handleAddUser,
        [TYPES.USER_LIST]: handlePopulateUsersList,
    }
    return handlers[action.type] ? handlers[action.type](state, action) : state
}

export default users
