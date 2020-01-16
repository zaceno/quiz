export const question = q => q.question
export const answer = (q, answer) => {
    let i = q.options.indexOf(answer)
    return q < 0 ? q : { ...q, answer: i }
}
export const unanswer = q => ({ ...q, answer: null })
export const getAnswer = q =>
    q.answer == null ? null : q.options[q.answer] || null
export const options = (q, bisect) =>
    !bisect
        ? q.options
        : q.correct < 2
        ? q.options.slice(0, 2)
        : q.options.slice(2)
export const isCorrect = q => q.answer != null && q.correct === q.answer
export const isIncorrect = q => q.answer != null && q.correct !== q.answer
export const isUnanswered = q => q.answer == null
