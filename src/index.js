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

const Question = ({ state }) => (
    <div>
        <p>{model.getQuestion(state)}</p>
        <ul>
            {model.getOptions(state).map(opt => (
                <li>
                    <input
                        type="radio"
                        checked={model.getAnswer(state) === opt}
                        onclick={[model.answer, opt]}
                    />
                    {opt}
                </li>
            ))}
        </ul>
    </div>
)

const GameScreen = ({ state, fetching = !model.getQuestion(state) }) => (
    <main>
        {!fetching ? (
            <Question state={state} />
        ) : (
            <marquee>...fetching...</marquee>
        )}
        <button disabled={fetching} onclick={model.next}>
            Next
        </button>
        <button
            disabled={fetching || model.isBisectorUsed(state)}
            onclick={model.bisect}
        >
            Bisect!
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
