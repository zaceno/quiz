import { POOL_SIZE, SERIES_LENGTH } from './const'
import randomIntList from './lib/random-int-list'
import fetchQuestion from './lib/fetch-question'

export const start = _ => {
    const series = randomIntList(POOL_SIZE, SERIES_LENGTH)
    return [
        {
            series,
            step: 0,
            questions: series.reduce((o, id) => ((o[id] = null), o), {}),
        },
        ...series.map(id => fetchQuestion(id, gotQuestion)),
    ]
}

const gotQuestion = (state, response) => ({
    ...state,
    questions: {
        ...state.questions,
        [response.id]: response,
    },
})

export const reset = _ => null

export const answer = (state, answer) => ({
    ...state,
    questions: {
        ...state.questions,
        [state.series[state.step]]: {
            ...state.questions[state.series[state.step]],
            answer,
        },
    },
})

export const next = state => ({ ...state, step: state.step + 1 })

const countQuestions = (state, filter) =>
    Object.entries(state.questions)
        .map(([k, v]) => (filter(v) ? 1 : 0))
        .reduce((n, x) => n + x, 0)

export const countCorrect = state =>
    countQuestions(state, q => q.answer && q.answer === q.correct)

export const countIncorrect = state =>
    countQuestions(state, q => q.answer && q.answer !== q.correct)

export const countUnanswered = state => countQuestions(state, q => !q.answer)

export const isEnded = state => state.step === state.series.length

export const isStarted = state => !!state

export const currentQuestion = state =>
    isStarted(state) &&
    !isEnded(state) &&
    state.questions[state.series[state.step]]
