import {
    POOL_SIZE,
    SERIES_LENGTH,
    TIMER_DURATION,
    TIMER_EXTENSION,
} from './const'
import randomIntList from './lib/random-int-list'
import fetchQuestion from './lib/fetch-question'
import { update as updateTime, subscribe as subscribeTime } from './lib/time'

export const start = _ => {
    const series = randomIntList(POOL_SIZE, SERIES_LENGTH)
    return [
        {
            series,
            step: 0,
            questions: series.reduce((o, id) => ((o[id] = null), o), {}),
        },
        updateTime(setTime),
        ...series.map(id => fetchQuestion(id, setQuestion)),
    ]
}

export const isStarted = state => !!state

export const setQuestion = (state, response) => ({
    ...state,
    questions: {
        ...state.questions,
        [response.id]: response,
    },

    timerUntil:
        response.id === state.series[state.step]
            ? state.now + TIMER_DURATION
            : state.timerUntil,
})

export const setTime = (state, now) => {
    const news = { ...state, now }
    return timeRemaining(news) < 0 ? next(news) : news
}

export const reset = state => null

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
    extendActive: false,
    timerUntil: state.now + TIMER_DURATION,
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

export const timeRemaining = state =>
    !isStarted(state) ||
    isEnded(state) ||
    !state.questions[state.series[state.step]]
        ? null
        : state.timerUntil - state.now

export const subscriptions = state => [
    isStarted(state) && !isEnded(state) && subscribeTime(setTime),
]

export const extend = state =>
    !state || state.extendUsed
        ? state
        : {
              ...state,
              extendActive: true,
              extendUsed: true,
              timerUntil:
                  state.timerUntil && state.timerUntil + TIMER_EXTENSION,
          }

export const isExtendUsed = state => !!(state && state.extendUsed)

export const getTimerPercent = state => {
    const duration = TIMER_DURATION + (state.extendActive ? TIMER_EXTENSION : 0)
    const remaining = timeRemaining(state)
    return Math.round((100 * remaining) / duration)
}
