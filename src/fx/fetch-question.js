import { QUESTIONS } from '../const'

/*
    phony question-fetch as a hyperapp effect
*/

const fetchQuestion = (dispatch, { action, id }) =>
    setTimeout(_ => {
        dispatch(action, { id, ...QUESTIONS[id] })
    }, 400) //emulate network delay

export default (id, action) => [fetchQuestion, { action, id }]
