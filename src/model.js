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
        ...series.map(id => fetchQuestion(id, gotQuestionResponse)),
    ]
}

export const isStarted = state => !!state

export const gotQuestionResponse = (state, response) => ({
    ...state,
    questions: {
        ...state.questions,
        [response.id]: response,
    },
})

export const reset = _ => null

export const getQuestion = state =>
    state == null || !state.questions[state.series[state.step]]
        ? null
        : state.questions[state.series[state.step]].question

export const answer = (state, answer) => {
    const ai = state.questions[state.series[state.step]].options.indexOf(answer)
    return {
        ...state,
        questions: {
            ...state.questions,
            [state.series[state.step]]: {
                ...state.questions[state.series[state.step]],
                answer: ai >= 0 ? ai : null,
            },
        },
    }
}

export const getAnswer = state => {
    if (!state) return null
    let q = state.questions[state.series[state.step]]
    return q && q.answer != null ? q.options[q.answer] : null
}

export const next = state => ({
    ...state,
    step: state.step + 1,
    bisectorActive: false,
})

export const isEnded = state => state.step >= state.series.length

const countQuestions = (state, filter) =>
    !state
        ? null
        : Object.entries(state.questions)
              .map(([k, v]) => (filter(v) ? 1 : 0))
              .reduce((n, x) => n + x, 0)

export const countCorrect = state =>
    countQuestions(state, q => q.answer != null && q.answer === q.correct)

export const countIncorrect = state =>
    countQuestions(state, q => q.answer != null && q.answer !== q.correct)

export const countUnanswered = state =>
    countQuestions(state, q => q.answer == null)

export const getOptions = state => {
    if (!state || !state.series[state.step]) return null
    let q = state.questions[state.series[state.step]]
    return !state.bisectorActive
        ? q.options
        : q.correct < 2
        ? q.options.slice(0, 2)
        : q.options.slice(2)
}

export const bisect = state => {
    if (!state || !state.series[state.step] || state.bisectorUsed) return state
    let q = state.questions[state.series[state.step]]
    return {
        ...state,
        bisectorUsed: true,
        bisectorActive: true,
        questions: {
            ...state.questions,
            [q.id]: {
                ...q,
                answer: null,
            },
        },
    }
}

export const isBisectorUsed = state =>
    !!state && state.series[state.step] && !!state.bisectorUsed

export const isBisectorActive = state =>
    !!state && state.series[state.step] && !!state.bisectorUsed
