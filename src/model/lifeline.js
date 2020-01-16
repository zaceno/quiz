export const init = { on: false, used: false }
export const on = state => (state.used ? state : { on: true, used: true })
export const off = state => ({ on: false, used: state.used })
export const isOn = ({ on }) => on
export const isUsed = ({ used }) => used
