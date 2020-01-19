import test from 'ava'
import * as model from '../src/model'
import { TIMER_DURATION, TIMER_EXTENSION } from '../src/const'

const StartWith = (state, length, fetched = true) => {
    let fx
    let list = [...Array(length).keys()].map(x => '' + (x + 1))
    ;[state, ...fx] = model.Start(state)
    ;[state, ...fx] = model.SetList(state, list)
    if (fetched) {
        list.forEach(id => {
            state = model.SetQuestion(state, {
                id,
                question: 'Q' + id,
                options: ['foo', 'bar', 'baz', 'bop'],
                correct: 1,
            })
        })
    }
    return state
}

test('isStarted', t => {
    let state = model.init
    t.false(model.isStarted(state))
    state = StartWith(state, 2)
    t.true(model.isStarted(state))
})

test('getQuestion returns null if not started', t => {
    t.is(model.getQuestion(model.init), null)
})

test('getQuestion returns null if ended', t => {
    let state = StartWith(model.init, 1)
    state = model.Next(state)
    t.is(model.getQuestion(state), null)
})

test('getQuestion retuns null if not fetched', t => {
    t.is(model.getQuestion(StartWith(model.init, 1, false)), null)
})

test('getQuestion returns current question if fetched', t => {
    const expect = { id: 1, foo: 'bar' }
    let state = StartWith(model.init, 1, false)
    state = model.SetQuestion(state, { id: 1, question: 'foo' })
    t.is(model.getQuestion(state), 'foo')
})

test('next steps to the next question', t => {
    let state = StartWith(model.init, 3)
    state = model.Next(state)
    t.is(model.getQuestion(state), 'Q2')
})

test('isEnded true when stepped past last question', t => {
    let state = StartWith(model.init, 2)
    t.false(model.isEnded(state))
    state = model.Next(state)
    t.false(model.isEnded(state))
    state = model.Next(state)
    t.true(model.isEnded(state))
})

test('getAnswer returns the current answer', t => {
    let state = StartWith(model.init, 1)
    state = model.Answer(state, 'baz')
    t.is(model.getAnswer(state), 'baz')
})

test('getAnswer returns null if not started', t => {
    t.is(model.getAnswer(model.init), null)
})

test('getAnswer returns null if ended', t => {
    let state = StartWith(model.init, 1)
    state = model.Next(state)
    t.is(model.getAnswer(state), null)
})

test('getAnswer returns null if no answer given', t => {
    let state = StartWith(model.init, 1)
    t.is(model.getAnswer(state), null)
})

test('an invalid answer is the same as no answer', t => {
    let state = StartWith(model.init, 1)
    state = model.Answer(state, 'baz')
    state = model.Answer(state, 'bazinga')
    t.is(model.getAnswer(state), null)
})

test('new answers overwrite previous ones', t => {
    let state = StartWith(model.init, 1)
    state = model.Answer(state, 'baz')
    state = model.Answer(state, 'foo')
    t.is(model.getAnswer(state), 'foo')
})

test('answers do not flow over to the next question', t => {
    let state = StartWith(model.init, 1)
    state = model.Answer(state, 'baz')
    state = model.Next(state)
    t.is(model.getAnswer(state), null)
})

test('count correct, incorrect, unanswered', t => {
    let state = StartWith(model.init, 9)
    ;[null, null, 'foo', 'bar', null, 'foo', 'foo', 'bar', null].forEach(
        val => {
            if (val) state = model.Answer(state, val)
            state = model.Next(state)
        }
    )
    t.is(model.countCorrect(state), 2)
    t.is(model.countIncorrect(state), 3)
    t.is(model.countUnanswered(state), 4)
})

test('count correct, incorrect, unanswered null if not started', t => {
    t.is(model.countCorrect(model.init), null)
    t.is(model.countIncorrect(model.init), null)
    t.is(model.countUnanswered(model.init), null)
})

test('getOptions returns null if not started', t => {
    t.is(model.getOptions(model.init), null)
})

test('getOptions returns null if ended', t => {
    let state = StartWith(model.init, 1)
    state = model.Next(state)
    t.is(model.getOptions(state), null)
})

test('getOptions returns options for current question', t => {
    let state = StartWith(model.init, 3)
    state.questions.items[2].options = ['zip', 'zorp']
    state = model.Next(state)
    t.deepEqual(model.getOptions(state), ['zip', 'zorp'])
})

test('bisecting makes getOptions return only the correct half', t => {
    let s1 = StartWith(model.init, 1)
    s1.questions.items['1'].correct = 0
    t.deepEqual(model.getOptions(model.Bisect(s1)), ['foo', 'bar'])

    let s2 = StartWith(model.init, 1)
    s2.questions.items['1'].correct = 1
    t.deepEqual(model.getOptions(model.Bisect(s2)), ['foo', 'bar'])

    let s3 = StartWith(model.init, 1)
    s3.questions.items['1'].correct = 2
    t.deepEqual(model.getOptions(model.Bisect(s3)), ['baz', 'bop'])

    let s4 = StartWith(model.init, 1)
    s4.questions.items['1'].correct = 3
    t.deepEqual(model.getOptions(model.Bisect(s4)), ['baz', 'bop'])
})

test('bisector stops being active for the next question', t => {
    let state = StartWith(model.init, 2)
    state = model.Bisect(state)
    state = model.Next(state)
    t.deepEqual(model.getOptions(state), ['foo', 'bar', 'baz', 'bop'])
})

test('bisection resets a previously given answer', t => {
    let state = StartWith(model.init, 1)
    state = model.Answer(state, 'foo')
    state = model.Bisect(state)
    t.is(model.getAnswer(state), null)
})

test('isBisectUsed', t => {
    let state = StartWith(model.init, 5)
    t.false(model.isBisectUsed(state))
    state = model.Next(state)
    t.false(model.isBisectUsed(state))
    state = model.Bisect(state)
    t.true(model.isBisectUsed(state))
    state = model.Next(state)
    t.true(model.isBisectUsed(state))
})

test('When the first question is availble, a timer is started', t => {
    let state = model.init
    t.is(model.timeRemaining(state), null)
    state = StartWith(state, 1, false)
    t.is(model.timeRemaining(state), null)
    state = model.SetQuestion(state, { id: '1' })
    t.is(model.timeRemaining(state), TIMER_DURATION)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 1000 + 5000)
    t.is(model.timeRemaining(state), TIMER_DURATION - 5000)
})

test('A second question being loaded later will not affect the current timer', t => {
    let state = StartWith(model.init, 2, false)
    state = model.SetQuestion(state, { id: '1' })
    state = model.SetTime(state, 1000)
    state = model.SetQuestion(state, { id: '2' })
    state = model.SetTime(state, 5000)
    t.is(model.timeRemaining(state), TIMER_DURATION - 4000)
})

test('when moving to the next answer, timer is restarted', t => {
    let state = StartWith(model.init, 2)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 5000)
    state = model.Next(state)
    t.is(model.timeRemaining(state), TIMER_DURATION)
})

test('when moving to the next answer, in case it hasnt been fetched yet, timer waits', t => {
    let state = StartWith(model.init, 2, false)
    state = model.SetQuestion(state, { id: '1' })
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 5000)
    state = model.Next(state)
    t.is(model.timeRemaining(state), null)
    state = model.SetQuestion(state, { id: '2' })
    state = model.SetTime(state, 7000)
    t.is(model.timeRemaining(state), TIMER_DURATION)
})

test('when time is up, the next question is stepped forward, and a new timer is started', t => {
    let state = StartWith(model.init, 2)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, TIMER_DURATION + 1000 + 1)
    t.is(model.getQuestion(state), 'Q2')
    t.is(model.timeRemaining(state), TIMER_DURATION)
})

test('when the series is ended, the timer is stopped for good', t => {
    let state = StartWith(model.init, 1)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, TIMER_DURATION + 1000 + 1)
    t.is(model.timeRemaining(state), null)
})

test('timer can be extended', t => {
    let state = StartWith(model.init, 1)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 5000)
    state = model.Extend(state)
    t.is(model.timeRemaining(state), TIMER_DURATION - 4000 + TIMER_EXTENSION)
})

test('timer can be extended just once in a series', t => {
    let state = StartWith(model.init, 2)
    state = model.SetTime(state, 1000)
    t.false(model.isExtendUsed(state))

    state = model.SetTime(state, 2000)
    state = model.Extend(state)
    t.true(model.isExtendUsed(state))
    t.is(model.timeRemaining(state), TIMER_DURATION - 1000 + TIMER_EXTENSION)

    state = model.SetTime(state, 3000)
    state = model.Extend(state)
    t.true(model.isExtendUsed(state))
    t.is(model.timeRemaining(state), TIMER_DURATION - 2000 + TIMER_EXTENSION)

    state = model.SetTime(state, 4000)
    state = model.Next(state)
    t.true(model.isExtendUsed(state))

    state = model.SetTime(state, 5000)
    state = model.Extend(state)
    t.true(model.isExtendUsed(state))
    t.is(model.timeRemaining(state), TIMER_DURATION)
})

test('totalTimeTaken returns null if game is not ended', t => {
    let state = model.init
    t.is(model.totalTimeTaken(state), null)
    state = StartWith(state, 1)
    t.is(model.totalTimeTaken(state), null)
})

test('totalTimeTaken returns the total time taken', t => {
    let state = StartWith(model.init, 2)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 4000)
    state = model.Next(state)
    state = model.SetTime(state, 5000)
    state = model.SetTime(state, 9000)
    state = model.Next(state)
    t.is(model.totalTimeTaken(state), 7000)
})

test('totalTimeTaken works regardless if Extend was used', t => {
    let state = StartWith(model.init, 2)
    state = model.SetTime(state, 1000)
    state = model.SetTime(state, 4000)
    state = model.Next(state)
    state = model.SetTime(state, 5000)
    state = model.Extend(state)
    state = model.SetTime(state, 9000)
    state = model.Next(state)
    t.is(model.totalTimeTaken(state), 7000)
})
