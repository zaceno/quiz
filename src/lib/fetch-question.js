/*
    phony question-fetch as a hyperapp effect
*/

const fetchQuestion = (dispatch, { action, id }) =>
    setTimeout(_ => {
        dispatch(action, {
            id,
            question: `Is the question with id ${id}?`,
            options: ['A', 'B', 'C', 'D'],
            correct: 2,
        })
    }, 400) //emulate network delay

export default (id, action) => [fetchQuestion, { action, id }]
