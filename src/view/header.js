import { h } from 'hyperapp'
import { Reset } from '../model'

export default ({ running }) => (
    <header>
        Quiz Time!
        {running && <button onclick={Reset}>Quit</button>}
    </header>
)
