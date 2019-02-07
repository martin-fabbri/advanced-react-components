import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import handleNewMessage from '../sagas'
import setupSocket from '../sockets'
import username from '../utils/name'

const sagaMiddelware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddelware),
)

const socket = setupSocket(store.dispatch, username)
sagaMiddelware.run(handleNewMessage, {socket, username})


export default store
