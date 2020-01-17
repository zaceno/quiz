import { h } from 'hyperapp'

export default ({ correct, incorrect, unanswered }) => (
    <table class="results">
        <tr class="correct">
            <th>Correct: {correct}</th>
            <td>
                <div class="bar" style={{ width: correct * 10 + '%' }} />
            </td>
        </tr>
        <tr class="incorrect">
            <th>Incorrect: {incorrect}</th>
            <td>
                <div class="bar" style={{ width: incorrect * 10 + '%' }} />
            </td>
        </tr>
        <tr class="unanswered">
            <th>Unanswered: {unanswered}</th>
            <td>
                <div class="bar" style={{ width: unanswered * 10 + '%' }} />
            </td>
        </tr>
    </table>
)
