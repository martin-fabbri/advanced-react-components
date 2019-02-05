import { call, put, fork, take, cancel } from 'redux-saga/effects'
import * as TYPES from '../types/TYPES'
import { fetchPerson, api, forkedFetchPerson } from '../actions'

describe('fetchPerson', () => {
    const personGen = fetchPerson()

    it('should hit api', () => {
        expect(personGen.next().value).toEqual(
            call(api, 'https://swapi.co/api/people/')
        )
    })

    it('on success dispatch success action', ()=> {
        const person = {results: []}
        expect(personGen.next(person).value).toEqual(put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results}))
    })
})

