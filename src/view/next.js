import { h } from 'hyperapp'
import { Next } from '../model'

const Gauge = ({ percent }, content) => (
    <div class="gauge-container">
        <div class="gauge-bar" style={{ width: percent + '%' }}></div>
        <p class="gauge-content">{content}</p>
    </div>
)

export default ({ remaining, duration, haveAnswer }) => (
    <div class="next">
        <div class={{ nextbutton: true, haveAnswer }} onclick={Next}>
            <p class="label">Next {'\u203A'}</p>
            <Gauge percent={Math.round((100 * remaining) / duration)}>
                {Math.round(remaining / 1000)}s
            </Gauge>
        </div>
    </div>
)
