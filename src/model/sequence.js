export const init = list => ({
    list,
    step: 0,
    items: list.reduce((o, id) => ((o[id] = null), o), {}),
})
export const next = state => ({
    ...state,
    step: state.step === state.length ? state.step : state.step + 1,
})
export const item = state =>
    isDone(state) ? null : state.items[state.list[state.step]]
export const id = state => (isDone(state) ? null : state.list[state.step])
export const set = (state, id, item) => ({
    ...state,
    items: { ...state.items, [id]: item },
})
export const update = (state, item) =>
    isDone(state)
        ? state
        : {
              ...state,
              items: { ...state.items, [state.list[state.step]]: item },
          }
export const isDone = state => state.step >= state.list.length
export const items = state => Object.entries(state.items).map(([k, v]) => v)
