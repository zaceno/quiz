import test from 'ava'
import * as model from '../src/model'

test('isStarted', t => {
    t.false(model.isStarted())
    let [state, ...effects] = model.start()
    t.true(model.isStarted(state))
})

test('gotQuestion', t => {
    let state = { questions: { 1337: null, 42: null }, foo: 'bar' }
    state = model.gotQuestion(state, { id: 1337, bing: 'bong' })
    state = model.gotQuestion(state, { id: 42, ping: 'pong' })
    t.deepEqual(state, {
        questions: {
            1337: { id: 1337, bing: 'bong' },
            42: { id: 42, ping: 'pong' },
        },
        foo: 'bar',
    })
})

test('next & currentQuestion', t => {
    let state = {
        questions: { 42: 'foo', 99: 'bar' },
        series: [42, 99],
        step: 0,
    }
    t.is(model.currentQuestion(state), 'foo')
    state = model.next(state)
    t.is(model.currentQuestion(state), 'bar')
})

test('isEnded', t => {
    let state = {
        series: [42, 99, 1337],
        step: 0,
    }
    state = model.next(state)
    t.false(model.isEnded(state))
    state = model.next(state)
    t.false(model.isEnded(state))
    state = model.next(state)
    t.true(model.isEnded(state))
})

test('answer', t => {
    let state = {
        questions: {
            42: { id: 42 },
            99: { id: 99 },
            1337: { id: 1337 },
        },
        series: [1337, 42, 99],
        step: 1,
    }
    t.deepEqual(model.answer(state, 'foo'), {
        questions: {
            42: { id: 42, answer: 'foo' },
            99: { id: 99 },
            1337: { id: 1337 },
        },
        series: [1337, 42, 99],
        step: 1,
    })
})

test('count correct, incorrect, unanswered', t => {
    let state = {
        questions: {
            1: { correct: 1 },
            2: { correct: 1 },
            3: { correct: 1 },
            4: { correct: 1 },
            5: { correct: 1 },
            6: { correct: 1 },
            7: { correct: 1 },
            8: { correct: 1 },
            9: { correct: 1 },
        },
        series: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        step: 0,
    }
    const answers = [0, 0, 1, 2, 0, 1, 1, 2, 0]
    const expCorrect = 3
    const expIncorrect = 2
    const expUnanswered = 4

    answers.forEach(val => {
        if (val > 0) state = model.answer(state, val)
        state = model.next(state)
    })

    t.is(model.countCorrect(state), expCorrect)
    t.is(model.countIncorrect(state), expIncorrect)
    t.is(model.countUnanswered(state), expUnanswered)
})
