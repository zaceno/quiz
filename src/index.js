import { h, app } from 'hyperapp'
const POOL_SIZE = 20
const SERIES_LENGTH = 10

/*
    Produces an array of given `length`, 
    containing random unique integers between 1 and `max` (inclusive)
    `length` must be <= `max`
    (Based of Fisher-Yates shuffling algorithm)
*/
function randomIntSeries(max, length) {
    let arr = [...Array(max).keys()].map(x => x + 1)
    for (let i = max - 1; i >= 0; i--) {
        let r = Math.round(Math.random() * i)
        let x = arr[r]
        arr[r] = arr[i]
        arr[i] = x
    }
    return arr.slice(0, length)
}

/*
    phony question-fetch as a hyperapp effect-creator
*/
const fetchQuestion = (() => {
    const fetchQuestion = (dispatch, { action, id }) =>
        setTimeout(_ => {
            dispatch(action, {
                id,
                question: `Is the question with id ${id}?`,
                options: ['A', 'B', 'C', 'D'],
                correct: 2,
            })
        }, 400) //emulate network delay
    return (id, action) => [fetchQuestion, { action, id }]
})()

/*
    Initiates a game round.
    - Defines the series of question ids
    - Begins fetching the questions
    - sets the first step as zero. 
*/
const Start = _ => {
    const series = randomIntSeries(POOL_SIZE, SERIES_LENGTH)
    return [
        {
            series,
            step: 0,
            questions: series.reduce((o, id) => ((o[id] = null), o), {}),
        },
        ...series.map(id => fetchQuestion(id, GotQuestion)),
    ]
}

const GotQuestion = (state, response) => ({
    ...state,
    questions: {
        ...state.questions,
        [response.id]: response,
    },
})

const Reset = _ => null

const SetAnswer = (state, answer) => ({
    ...state,
    questions: {
        ...state.questions,
        [state.series[state.step]]: {
            ...state.questions[state.series[state.step]],
            answer,
        },
    },
})

const NextQuestion = state => ({ ...state, step: state.step + 1 })

const count = (list, filter) =>
    list.reduce((n, x) => (filter(x) ? n + 1 : n), 0)
const countQuestions = (state, filter) =>
    count(
        state.series.map(id => state.questions[id]),
        filter
    )
const countCorrect = state =>
    countQuestions(state, q => q.answer && q.answer === q.correct)
const countIncorrect = state =>
    countQuestions(state, q => q.answer && q.answer !== q.correct)
const countUnanswered = state => countQuestions(state, q => !q.answer)

/*
    Saves the question in state
    and shows it
const ShowQuestion = (state, question) => ({
    ...state,
    mode: 'asking',
    question,
    selected: null
})

*/
/*
    Remembers current selected answer
const Select = (state, selected) => ({
    ...state,
    selected,
})

*/
/*
    Checks if the selected option
    is correct, wrong or unanswered, and remembers
    the result.
    Starts fetching the next question in the
    sequence. On response, shows the question
    If this is the last question, goes to
    the result page instead
const Submit = state => (
    state.step + 1 < SERIES_LENGTH ? [
        {
            ...state,
            step: state.step + 1,
            mode: 'fetching',
            answers: [
                ...state.answers,
                (state.selected === null ? null : state.question.correct === state.selected)
            ],
            selected: null
        },
        getQuestion(state.series[state.step + 1], ShowQuestion)
    ]
    : {
        ...state,
        mode: 'finished',
        answers: [
            ...state.answers,
            (state.selected === null ? null : state.question.correct === state.selected)
        ]
    }
)
*/

/*
    Prepares a new series of questions and
    goes to the initial page.
const Reset  = _ => ({
    series: randomIntSeries(POOL_SIZE, SERIES_LENGTH),
    mode: 'initial',
    answers: [],
    step: null,
    selected: null,
})
*/

// --- RUN

app({
    view: state => (
        <main>
            <section>
                Trivia Game
                {state != null && <button onclick={Reset}>Quit</button>}
            </section>
            {state == null ? (
                <section>
                    <button onclick={Start}>Start</button>
                </section>
            ) : state.step === state.series.length ? (
                <section>
                    <p>Result:</p>
                    <p>
                        <b>Correct:</b> {countCorrect(state)}
                    </p>
                    <p>
                        <b>Incorrect:</b> {countIncorrect(state)}
                    </p>
                    <p>
                        <b>Unanswered:</b> {countUnanswered(state)}
                    </p>
                </section>
            ) : !state.questions[state.series[state.step]] ? (
                <section>
                    <marquee>... fetching ...</marquee>
                </section>
            ) : (
                <section>
                    <p>{state.questions[state.series[state.step]].question}</p>
                    <ul>
                        {state.questions[state.series[state.step]].options.map(
                            (opt, index) => (
                                <li>
                                    <input
                                        type="radio"
                                        checked={
                                            state.questions[
                                                state.series[state.step]
                                            ].answer === index
                                        }
                                        onclick={[SetAnswer, index]}
                                    />
                                    {opt}
                                </li>
                            )
                        )}
                    </ul>
                    <button onclick={NextQuestion}>Next ></button>
                </section>
            )}
        </main>
    ),
    node: document.querySelector('main'),
})

/*
 state.mode === 'fetching' ? (
                    <section>
                        <marquee>fetching...</marquee>
                    </section>
                )
                : state.mode === 'asking' ? (
                    <section>
                        <p>{state.question.question}</p>
                        <ul>{
                            state.question.options.map((option, index) => (
                                <li>
                                    <input
                                        type="radio"
                                        checked={state.selected === index}
                                        onmousedown={[Select, index]}
                                    />
                                    {option}
                                </li>
                            ))  
                        }</ul>
                        <button onclick={Submit}>Next ></button>
                        <button onclick={Reset}>Quit</button>
                    </section>
                )
                : (
                    <section>
                        <p>Result:</p>
                        <p>Correct: {state.answers.reduce((y, x) => (x === true ? y + 1 : y), 0)}</p>
                        <p>Inorrect: {state.answers.reduce((y, x) => (x === false ? y + 1 : y), 0)}</p>
                        <p>Unanswered: {state.answers.reduce((y, x) => (x === null ? y + 1 : y), 0)}</p>

                        <button onclick={Reset}>Want to try again?</button>
                    </section>
                )
*/
