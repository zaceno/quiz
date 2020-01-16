import {
    POOL_SIZE,
    SERIES_LENGTH,
    TIMER_DURATION,
    TIMER_EXTENSION,
} from '../const'

import fetchRandomIntList from '../fx/fetch-random-int-list'
import fetchQuestion from '../fx/fetch-question'
import subscribeTime from '../fx/time'

import * as lifeline from './lifeline'
import * as timer from './timer'
import * as question from './question'
import * as sequence from './sequence'

export const init = {
    bisection: lifeline.init,
    extension: lifeline.init,
    timer: timer.init,
    questions: null,
}

export const subscriptions = state => [
    timer.isRunning(state.timer) && subscribeTime(SetTime),
]

export const Reset = state => init

export const Start = state => [
    state,
    fetchRandomIntList(POOL_SIZE, SERIES_LENGTH, SetList),
]

export const SetList = (state, list) => [
    { ...state, questions: sequence.init(list) },
    ...list.map(id => fetchQuestion(id, SetQuestion)),
]

export const SetQuestion = (state, question) => ({
    ...state,
    questions: sequence.set(state.questions, question.id, question),
    timer:
        question.id === sequence.id(state.questions)
            ? timer.start(state.timer)
            : state.timer,
})

export const SetTime = (state, now) => {
    let news = { ...state, timer: timer.update(state.timer, now) }
    return !timer.isRunning(news.timer) ? Next(news) : news
}

export const Answer = (state, answer) => ({
    ...state,
    questions: sequence.update(
        state.questions,
        question.answer(sequence.item(state.questions), answer)
    ),
})

export const Next = state => {
    const questions = sequence.next(state.questions)
    return {
        ...state,
        questions,
        bisection: lifeline.off(state.bisection),
        extension: lifeline.off(state.extension),
        timer: sequence.item(questions)
            ? timer.start(state.timer)
            : timer.stop(state.timer),
    }
}

export const Bisect = state =>
    lifeline.isUsed(state.bisection)
        ? state
        : {
              ...state,
              bisection: lifeline.on(state.bisection),
              questions: sequence.update(
                  state.questions,
                  question.unanswer(sequence.item(state.questions))
              ),
          }

export const Extend = state =>
    lifeline.isUsed(state.extension)
        ? state
        : {
              ...state,
              extension: lifeline.on(state.extension),
              timer: timer.extend(state.timer),
          }

// --- QUERIES: -----

export const isStarted = state => !!state.questions

export const getQuestion = state => {
    if (!state.questions) return null
    let q = sequence.item(state.questions)
    return q ? question.question(q) : null
}

export const getAnswer = state => {
    if (!state.questions) return null
    let q = sequence.item(state.questions)
    return q ? question.getAnswer(q) : null
}

export const isEnded = state => sequence.isDone(state.questions)

const count = ({ questions }, filter) =>
    !questions ? null : sequence.items(questions).filter(filter).length
export const countCorrect = state => count(state, question.isCorrect)
export const countIncorrect = state => count(state, question.isIncorrect)
export const countUnanswered = state => count(state, question.isUnanswered)

export const getOptions = state => {
    if (!state.questions) return null
    let q = sequence.item(state.questions)
    return !q ? null : question.options(q, lifeline.isOn(state.bisection))
}

export const isBisectUsed = state =>
    isStarted(state) && lifeline.isUsed(state.bisection)

export const isBisectActive = state =>
    isStarted(state) && lifeline.isOn(state.bisection)

export const timeRemaining = state => timer.remaining(state.timer)

export const isExtendUsed = state => lifeline.isUsed(state.extension)

export const getTimerPercent = state => {
    const duration =
        TIMER_DURATION + (lifeline.isOn(state.extension) ? TIMER_EXTENSION : 0)
    return Math.round((100 * timer.remaining(state.timer)) / duration)
}
