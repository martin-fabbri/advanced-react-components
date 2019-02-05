import { call, put, actionChannel, take } from 'redux-saga/effects'
import * as TYPES from '../types/TYPES'

export const api = (url) => fetch(url).then(response => response.json())

export const fetchStarWarsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_REQUEST
});

export const confirmFetchRequest = () => ({
    type: TYPES.CONFIRMATION
})

export const cancelRequest = () => ({
    type: TYPES.CANCELLED
})

export const fetchStarWarsPlanetRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_PLANET_REQUEST
})

// export const queueChannelRequest = () => ({
//     type: TYPES.QUEUE_CHANNEL_REQUESTS
// })

export const queueChannelRequest = () => {
    console.log('queueChannelRequest ... About to return:', TYPES.QUEUE_CHANNEL_REQUESTS)
    return {
        type: TYPES.QUEUE_CHANNEL_REQUESTS
    }
}

export function* fetchPerson(action) {
    try {
        // yield fork(api, 'https://dog.ceo/api/breeds/list/all')
        //const dogs = yield spawn(api, 'https://dog.ceo/api/breeds/list/all')
        console.log('FETCH PERSON');
        const person = yield call(api, 'https://swapi.co/api/people/')
        yield put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results})
        //yield take('CANCELLED')
        //yield cancel(dogs)

        // console.log('entered')
        // yield take(TYPES.CONFIRMATION)
        // console.log('passed confirmation')
        // const { normal, custom } = yield race({
        //    normal: call(api, 'https://swapi.co/api/people/'),
        //    custom: call(api, 'https://swapi.co/api/people/custom')
        // });
        // const selector = yield select( state => state.starWars)

    } catch (e) {
        console.log(e)
    }
}

export function* fetchPlanets(action) {
    try {
        console.log('Fetch planets')
        const planet = yield call(api, 'https://swapi.co/api/planets/')
        yield put({ type: TYPES.FETCH_STAR_WARS_PLANET_SUCCESS, data: planet.results})
    } catch (e) {
        console.log(e)
    }
}

export function* takeOneAtMost() {
    console.log('takeOneAtMost ... before yield actionChannel')
    const chan = yield actionChannel(TYPES.QUEUE_CHANNEL_REQUESTS)
    for (let i = 1; i >= 1; i++) {
        console.log('takeOneAtMost ... ready to take next action')
        yield take(chan)
        console.log('takeOneAtMost ... calling people API')
        yield call(api, 'https://swapi.co/api/people/')
        console.log('takeOneAtMost ... API call completed')
        yield put({type: TYPES.QUEUE_CHANNEL_SUCCESS, data: i})
    }
}