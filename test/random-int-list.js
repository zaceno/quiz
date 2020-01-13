import test from 'ava'
import randomIntList from '../src/lib/random-int-list'

/*
Since this is a random function, there isn't much we can dependably
test about it. But a couple properties are testable
*/

test('returns a list of given lenth', t => t.is(randomIntList(9, 3).length, 3))
test('if length is same as max, contains each 1 - max', t =>
    t.deepEqual(randomIntList(5, 5).sort(), [1, 2, 3, 4, 5]))
