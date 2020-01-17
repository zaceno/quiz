import { h } from 'hyperapp'
import { Bisect, Extend } from '../model'

const LifelineButton = ({ used, onuse }, symbol) => (
    <button disabled={used} class={{ used }} onclick={onuse}>
        {symbol}
    </button>
)

export default ({ usedBisect, usedExtend }) => (
    <div class="lifelines">
        <LifelineButton used={usedBisect} onuse={Bisect}>
            {'\u25D1'}
        </LifelineButton>
        <LifelineButton used={usedExtend} onuse={Extend}>
            {'\u231B'}
        </LifelineButton>
    </div>
)
