import { h, app } from 'hyperapp'
import * as model from './model/index'

const StartScreen = () => (
    <main>
        <button onclick={model.Start}>Start</button>
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
                        onclick={[model.Answer, opt]}
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
        {model.timeRemaining(state) != null && (
            <div
                style={{
                    display: 'inline-block',
                    border: '1px black solid',
                    height: '18px',
                    width: '100px',
                    padding: '0',
                    margin: '0',
                    backgroundColor: '#888',
                    position: 'relative',
                    verticalAlign: 'middle',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        padding: '0',
                        margin: '0',
                        backgroundColor: 'cornflowerblue',
                        width: model.getTimerPercent(state) + '%',
                    }}
                ></div>
                <p
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        padding: '0',
                        margin: '0',
                        fontSize: '15px',
                        lineHeight: '18px',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    {Math.round(model.timeRemaining(state) / 1000)}s
                </p>
            </div>
        )}
        <button disabled={fetching} onclick={model.Next}>
            Next
        </button>
        <button
            disabled={fetching || model.isBisectUsed(state)}
            onclick={model.Bisect}
        >
            Bisect!
        </button>
        <button
            disabled={fetching || model.isExtendUsed(state)}
            onclick={model.Extend}
        >
            Extend!
        </button>
    </main>
)

const MainView = ({ state }) => (
    <section>
        <header>
            Trivia Game!
            {model.isStarted(state) && (
                <button onclick={model.Reset}>Quit</button>
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
    init: model.init,
    view: state => <MainView state={state} />,
    subscriptions: state => [...model.subscriptions(state)],
})
