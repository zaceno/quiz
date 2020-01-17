# A Quiz Game

1. Clone the repo `git clone https://github.com/zaceno/quiz`
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start the game on a local dev server: `npm start`
5. Run the game in your browser of choice by visiting `https://localhost:1234`

Note: Only tested in latest Chrome, Safari and Firefox, but should work in any modern browser.

## A guide to reading the code

I implemented this using the [Hyperapp](https://hyperapp.dev) micro-framework.

It is based on "[The Elm Architecture](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/38)".
The app's entire state lives together in a single object. A _view_ function determines what we want the dom
to look like (by way of a virtual dom), as a pure function of the state. Actions are pure functions meant to
transform the state. They are "dispatched" in response to browser events, meaning that hyperapp calculates
the next state, uses the view to calculate the next virtual dom tree, and updates the real dom to match.

If you're curious to learn more, see this
[official tutorial](https://github.com/jorgebucaran/hyperapp/blob/master/docs/tutorial.md)
I wrote, or [this Medium article](https://medium.com/hyperapp/a-walk-through-hyperapp-2-b1f642fca172)

I have basically split my app into a model and a view. The view is a single function, composed of several
smaller components just to make it easier to grasp. The model is a collection of actions for transforming the state,
and "queries" to help you get data out of the state without having to know the internal representation. Here too
I have composed the actions and queries from other functions, collected in separate modules of related logic, in
order to make it easier to overview.

```
/
    questions.json      -- static file containing the quiz questions
    src/
        index.html      -- base html file for the app.
        style.css       -- styles
        index.js        -- Main entry point for the app. Imports model and view to run.
        const.js        -- Various constant values collected in a convenient spot.
        model/
            index.js    -- exports all the necessary actions and queries
            timer.js    -- timer logic (imported and composed in index.js)
            lifeline.js -- lifeline logic (imported and composed in index.js)
            etc...
        view/
            index.js    -- exports the app's view function composed from:
            options.js
            results.js
            etc...
```

Note: Actions, by convention start with uppercase letters. As do JSX components.
Otherwise I try to use dromedaryCase everywher.

Note: In my view code, I have used JSX. The bundler tool (parcel-bundler) automatically detects the presence of
hyperapp and converts JSX tags to hyperapp `h` calls. But it only works as long as the `h` function is
present in files that use JSX.

Note: The `docs/` folder is not for actual docs, but for publishing the app on github pages.
