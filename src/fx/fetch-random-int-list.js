/*
    Produces an array of given `length`, 
    containing random unique integers between 1 and `max` (inclusive)
    `length` must be <= `max`
    (Based of Fisher-Yates shuffling algorithm)

    in the form of a hyperapp effect
 */

const randomIntList = function(max, length) {
    let arr = [...Array(max).keys()].map(x => '' + (x + 1))
    for (let i = max - 1; i >= 0; i--) {
        let r = Math.round(Math.random() * i)
        let x = arr[r]
        arr[r] = arr[i]
        arr[i] = x
    }
    return arr.slice(0, length)
}

const effectFn = (dispatch, { action, max, length }) =>
    dispatch(action, randomIntList(max, length))

export default (max, length, action) => [effectFn, { max, length, action }]
