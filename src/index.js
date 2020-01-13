import { h, app } from 'hyperapp'
import * as model from './model'

const StartScreen = () => (
    <main>
        <button onclick={model.start}>Start</button>
    </main>
)

const ResultScreen = ({ state }) => (
    <main>
        <div>
            <p>All Done! Here are your results:</p>
            <p>
                <b>Correct:</b> {model.countCorrect(state)}
            </p>
            <p>
                <b>Incorrect: </b> {model.countIncorrect(state)}
            </p>
            <p>
                <b>Unanswered: </b> {model.countUnanswered(state)}
            </p>
        </div>
    </main>
)

const Question = ({ question, options, answer }) => (
    <div>
        <p>{question}</p>
        <ul>
            {options.map((text, index) => (
                <li>
                    <input
                        type="radio"
                        checked={answer === index}
                        onclick={[model.answer, index]}
                    />
                    {text}
                </li>
            ))}
        </ul>
    </div>
)

const GameScreen = ({ state, question = model.currentQuestion(state) }) => (
    <main>
        {question ? (
            <Question {...question} />
        ) : (
            <marquee>...fetching...</marquee>
        )}
        <button disabled={!question} onclick={model.next}>
            Next
        </button>
    </main>
)

const MainView = ({ state }) => (
    <section>
        <header>
            Trivia Game!
            {model.isStarted(state) && (
                <button onclick={model.reset}>Quit</button>
            )}
        </header>
        {!model.isStarted(state) ? (
            <StartScreen />
        ) : model.isEnded(state) ? (
            <ResultScreen state={state} />
        ) : (
            <GameScreen state={state} />
        )}
    </section>
)

app({
    node: document.getElementById('app'),
    view: state => <MainView state={state} />,
})
