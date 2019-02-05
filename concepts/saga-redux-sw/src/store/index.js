import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import mySaga from '../sagas'

const sagaMiddelware = createSagaMiddleware()

export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddelware)
)

sagaMiddelware.run(mySaga)


