const _update = (dispatch, { action }) => dispatch(action, performance.now())

const _subscribe = (dispatch, { action }) => {
    let id = requestAnimationFrame(function frame(timestamp) {
        id = requestAnimationFrame(frame)
        dispatch(action, timestamp)
    })
    return () => cancelAnimationFrame(id)
}

export const update = action => [_update, { action }]
export const subscribe = action => [_subscribe, { action }]
