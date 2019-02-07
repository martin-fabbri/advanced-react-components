import { takeEvery } from 'redux-saga/effects'
import * as TYPES from '../types'

const handleNewMessage = function* handleNewMessage(params) {
    yield takeEvery(TYPES.ADD_MESSAGE, (action => {
        console.log('SAGA -> handleNewMessage ... action', action, params)
        action.author = params.username
        params.socket.send(JSON.stringify(action))
    }))
}

export default handleNewMessage