import { takeLatest, all } from 'redux-saga/effects'

import * as TYPES from '../types/TYPES'
import { fetchPerson, fetchPlanets, takeOneAtMost } from '../actions'

function* mySaga() {
    // yield all([
    //     takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, fetchPerson),
    //     // takeLatest(TYPES.FETCH_STAR_WARS_PLANET_REQUEST, fetchPlanets),
    //     takeLatest(TYPES.FETCH_STAR_WARS_PLANET_REQUEST, takeOneAtMost),
    // ])
    // yield takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, fetchPerson)
    // yield takeLatest(TYPES.FETCH_STAR_WARS_PLANET_REQUEST, fetchPlanets)
    // yield takeLatest(TYPES.QUEUE_CHANNEL_REQUESTS, takeOneAtMost)
    yield takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, takeOneAtMost)
}

export default mySaga
