import test from 'ava'
import fetchRandomIntList from '../src/fx/fetch-random-int-list'

/*
Since the function that produces random int lists is shaped 
as a hyperapp effect, we can't canll it directly. Insread
use this helper:
*/
const run = (max, length) => {
    let list
    const [effectFn, props] = fetchRandomIntList(max, length)
    effectFn((_, l) => {
        list = l
    }, props)
    return list
}

/*
Since this is a random function, there isn't much we can dependably
test about it. But a couple properties are testable
*/
test('returns a list of given lenth', t => t.is(run(9, 3).length, 3))
test('if length is same as max, contains each 1 - max', t =>
    t.deepEqual(run(5, 5).sort(), ['1', '2', '3', '4', '5']))
