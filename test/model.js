import test from 'ava'
import * as model from '../src/model'

const testState = (length, fetched = true) => {
    const series = [...Array(length).keys()].map(x => '' + (x + 1))
    const step = 0
    const questions = series.reduce((o, id) => {
        o[id] = fetched
            ? {
                  id,
                  question: 'Q' + id,
                  options: ['foo', 'bar', 'baz', 'bop'],
                  correct: 1,
              }
            : null
        return o
    }, {})
    return { questions, series, step }
}

test('isStarted', t => {
    t.false(model.isStarted())
    let [state, ...effects] = model.start()
    t.true(model.isStarted(state))
})

test('getQuestion returns null if not started', t => {
    t.is(model.getQuestion(), null)
})

test('getQuestion returns null if ended', t => {
    let state = testState(1)
    state = model.next(state)
    t.is(model.getQuestion(state), null)
})

test('getQuestion retuns null if not fetched', t => {
    t.is(model.getQuestion(testState(1, false)), null)
})

test('getQuestion returns current question if fetched', t => {
    const expect = { id: 1, foo: 'bar' }
    let state = testState(1, false)
    state = model.gotQuestionResponse(state, { id: 1, question: 'foo' })
    t.is(model.getQuestion(state), 'foo')
})

test('next steps to the next question', t => {
    let state = testState(3)
    state = model.next(state)
    t.is(model.getQuestion(state), 'Q2')
})

test('isEnded true when stepped past last question', t => {
    let state = testState(2)
    t.false(model.isEnded(state))
    state = model.next(state)
    t.false(model.isEnded(state))
    state = model.next(state)
    t.true(model.isEnded(state))
})

test('getAnswer returns the current answer', t => {
    let state = testState(1)
    state = model.answer(state, 'baz')
    t.is(model.getAnswer(state), 'baz')
})

test('getAnswer returns null if not started', t => {
    t.is(model.getAnswer(), null)
})

test('getAnswer returns null if ended', t => {
    let state = testState(1)
    state = model.next(state)
    t.is(model.getAnswer(state), null)
})

test('getAnswer returns null if no answer given', t => {
    let state = testState(1)
    t.is(model.getAnswer(state), null)
})

test('an invalid answer is the same as no answer', t => {
    let state = testState(1)
    state = model.answer(state, 'baz')
    state = model.answer(state, 'bazinga')
    t.is(model.getAnswer(state), null)
})

test('new answers overwrite previous ones', t => {
    let state = testState(1)
    state = model.answer(state, 'baz')
    state = model.answer(state, 'foo')
    t.is(model.getAnswer(state), 'foo')
})

test('answers do not flow over to the next question', t => {
    let state = testState(1)
    state = model.answer(state, 'baz')
    state = model.next(state)
    t.is(model.getAnswer(state), null)
})

test('count correct, incorrect, unanswered', t => {
    let state = testState(9)
    ;[null, null, 'foo', 'bar', null, 'foo', 'foo', 'bar', null].forEach(
        val => {
            if (val) state = model.answer(state, val)
            state = model.next(state)
        }
    )
    t.is(model.countCorrect(state), 2)
    t.is(model.countIncorrect(state), 3)
    t.is(model.countUnanswered(state), 4)
})

test('count correct, incorrect, unanswered null if not started', t => {
    t.is(model.countCorrect(), null)
    t.is(model.countIncorrect(), null)
    t.is(model.countUnanswered(), null)
})

test('getOptions returns null if not started', t => {
    t.is(model.getOptions(), null)
})

test('getOptions returns null if ended', t => {
    let state = testState(1)
    state = model.next(state)
    t.is(model.getOptions(state), null)
})

test('getOptions returns options for current question', t => {
    let state = testState(3)
    state.questions[2].options = ['zip', 'zorp']
    state = model.next(state)
    t.deepEqual(model.getOptions(state), ['zip', 'zorp'])
})

test('bisecting makes getOptions return only the correct half', t => {
    let s1 = testState(1)
    s1.questions['1'].correct = 0
    t.deepEqual(model.getOptions(model.bisect(s1)), ['foo', 'bar'])

    let s2 = testState(1)
    s2.questions['1'].correct = 1
    t.deepEqual(model.getOptions(model.bisect(s2)), ['foo', 'bar'])

    let s3 = testState(1)
    s3.questions['1'].correct = 2
    t.deepEqual(model.getOptions(model.bisect(s3)), ['baz', 'bop'])

    let s4 = testState(1)
    s4.questions['1'].correct = 3
    t.deepEqual(model.getOptions(model.bisect(s4)), ['baz', 'bop'])
})

test('bisector stops being active for the next question', t => {
    let state = testState(2)
    state = model.bisect(state)
    state = model.next(state)
    t.deepEqual(model.getOptions(state), ['foo', 'bar', 'baz', 'bop'])
})

test('bisection resets a previously given answer', t => {
    let state = testState(1)
    state = model.answer(state, 'foo')
    state = model.bisect(state)
    t.is(model.getAnswer(state), null)
})

test('isBisectorUsed', t => {
    let state = testState(5)
    t.false(model.isBisectorUsed(state))
    state = model.next(state)
    t.false(model.isBisectorUsed(state))
    state = model.bisect(state)
    t.true(model.isBisectorUsed(state))
    state = model.next(state)
    t.true(model.isBisectorUsed(state))
})
