/*

    A hyperapp subscription to requestAnimationFrame
    which will dispatch actions with timestamps as payloads

*/

const frameSub = (dispatch, { action }) => {
    let id = requestAnimationFrame(function frame(timestamp) {
        id = requestAnimationFrame(frame)
        dispatch(action, timestamp)
    })
    return () => cancelAnimationFrame(id)
}

export default action => [frameSub, { action }]
