/*

This is the main model of the app.

File is structured into three sections. 
1. The initialization, and subscriptions functions for starting the app
2. All the actions (state transforms)
3. All the queries (compute values from state)

*/

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

// --- INIT & SUBS  ---

export const init = {
    bisection: lifeline.init,
    extension: lifeline.init,
    timer: timer.init,
    questions: null,
}

export const subscriptions = state => [
    timer.isRunning(state.timer) && subscribeTime(SetTime),
]

// --- ACTIONS ---

export const Reset = state => init

export const Start = state => [
    { ...state, totalTime: 0 },
    fetchRandomIntList(POOL_SIZE, SERIES_LENGTH, SetList),
]

export const SetList = (state, list) => [
    { ...state, questions: sequence.init(list) },
    ...list.map(id => fetchQuestion(id, SetQuestion)),
]

// Only meant to be called as a response from the
// fetchQuestion effect
export const SetQuestion = (state, question) => ({
    ...state,
    questions: sequence.set(state.questions, question.id, question),
    timer:
        question.id === sequence.id(state.questions)
            ? timer.start(state.timer)
            : state.timer,
})

// Only meant to be called as a response from the time
// subscription
export const SetTime = (state, now) => {
    let news = { ...state, timer: timer.update(state.timer, now) }
    // if the timer has timed out, advance to the next question
    return !timer.isRunning(news.timer) ? Next(news) : news
}

// Selects one of the options as the current answer
export const Answer = (state, answer) => ({
    ...state,
    questions: sequence.update(
        state.questions,
        question.answer(sequence.item(state.questions), answer)
    ),
})

// Advances to the next questio
export const Next = state => {
    const questions = sequence.next(state.questions)
    return {
        ...state,
        questions,
        //deactivate currently active lifelines
        bisection: lifeline.off(state.bisection),
        extension: lifeline.off(state.extension),
        //if there is another question, restart the timer
        //else stop it
        timer: sequence.item(questions)
            ? timer.start(state.timer)
            : timer.stop(state.timer),
        //Increment the total time taken with remaining time
        totalTime:
            state.totalTime + (timeDuration(state) - timeRemaining(state)),
    }
}

// Invoke the "bisect" lifeline
// (= remove two incorrect options)
export const Bisect = state =>
    lifeline.isUsed(state.bisection)
        ? state
        : {
              ...state,
              bisection: lifeline.on(state.bisection),
              //since we might have removed the currently
              //selected answer, turn off all answers
              questions: sequence.update(
                  state.questions,
                  question.unanswer(sequence.item(state.questions))
              ),
          }

//Invoke the "extend" lifeline
//(= add 10s to the timer)
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

export const isEnded = state =>
    state.questions && sequence.isDone(state.questions)

const count = ({ questions }, filter) =>
    !questions ? null : sequence.items(questions).filter(filter).length
export const countCorrect = state => count(state, question.isCorrect)
export const countIncorrect = state => count(state, question.isIncorrect)
export const countUnanswered = state => count(state, question.isUnanswered)

// Return the options for a question
// which is normally all of them, except
// when the bisect-lifeline is active
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

// if the extend lifeline is active, the timer duration is 10s more
// that it usually is
export const timeDuration = state =>
    TIMER_DURATION + (lifeline.isOn(state.extension) ? TIMER_EXTENSION : 0)

export const totalTimeTaken = state => (isEnded(state) ? state.totalTime : null)
