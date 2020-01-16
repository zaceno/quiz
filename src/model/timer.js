import { TIMER_DURATION, TIMER_EXTENSION } from '../const'

export const init = {
    running: false,
    now: null,
    until: null,
}
export const start = state => ({ ...init, running: true })

export const stop = state => ({ ...init })

export const update = (state, now) =>
    state.until && now > state.until
        ? { ...init }
        : {
              ...state,
              until:
                  !state.running || state.until
                      ? state.until
                      : TIMER_DURATION + now,
              now: state.running ? now : null,
          }

export const extend = state =>
    state.now < state.until
        ? {
              ...state,
              until: state.until + TIMER_EXTENSION,
          }
        : state

export const isRunning = state => state.running

export const remaining = state =>
    !isRunning(state)
        ? null
        : !state.until
        ? TIMER_DURATION
        : state.until - state.now
