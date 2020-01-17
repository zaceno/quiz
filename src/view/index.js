import { h } from 'hyperapp'
import * as model from '../model/index'
import Options from './options'
import Question from './question'
import Next from './next'
import Lifelines from './lifelines'
import Header from './header'
import StartButton from './start-button'
import Results from './results'

export default state => (
    <section>
        <Header running={model.isStarted(state)} />
        {!model.isStarted(state) ? (
            <main class="start-container">
                <StartButton />
            </main>
        ) : model.isEnded(state) ? (
            <main class="result-container">
                <p>All Done! Here are your results:</p>
                <Results
                    correct={model.countCorrect(state)}
                    incorrect={model.countIncorrect(state)}
                    unanswered={model.countUnanswered(state)}
                />
            </main>
        ) : !model.getQuestion(state) ? (
            <main class="loading-container">
                <div class="spinner"></div>
            </main>
        ) : (
            <main class="game-container">
                <Question>{model.getQuestion(state)}</Question>
                <Options
                    options={model.getOptions(state)}
                    answer={model.getAnswer(state)}
                />
                <Next
                    remaining={model.timeRemaining(state)}
                    duration={model.timeDuration(state)}
                    haveAnswer={!!model.getAnswer(state)}
                />
                <Lifelines
                    usedBisect={model.isBisectUsed(state)}
                    usedExtend={model.isExtendUsed(state)}
                />
            </main>
        )}
    </section>
)
