/*
    Produces an array of given `length`, 
    containing random unique integers between 1 and `max` (inclusive)
    `length` must be <= `max`
    (Based of Fisher-Yates shuffling algorithm)
*/
export default function(max, length) {
    let arr = [...Array(max).keys()].map(x => x + 1)
    for (let i = max - 1; i >= 0; i--) {
        let r = Math.round(Math.random() * i)
        let x = arr[r]
        arr[r] = arr[i]
        arr[i] = x
    }
    return arr.slice(0, length)
}
