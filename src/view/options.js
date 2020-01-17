import { h } from 'hyperapp'
import { Answer } from '../model'

export default ({ options, answer }) => (
    <ul class="options">
        {options.map(opt => (
            <li
                onmousedown={[Answer, opt]}
                class={{
                    option: true,
                    selected: answer && opt === answer,
                    notselected: answer && opt !== answer,
                    noanswer: !answer,
                }}
            >
                <div class="bullet"></div>
                <span class="text">{opt}</span>
            </li>
        ))}
    </ul>
)
