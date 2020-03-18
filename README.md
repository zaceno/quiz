# A Quiz Game

***Try it live [here](https://zaceno.github.io/quiz/)***

or:

1. Clone the repo `git clone https://github.com/zaceno/quiz`
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start the game on a local dev server: `npm start`
5. Run the game in your browser of choice by visiting `https://localhost:1234`

Only tested in latest Chrome, Safari and Firefox, but should work in any modern browser.

I have noticed there is a rendering bug in Safari (not in Chrome or Firefox), where sometimes the
lines of a long question remain on screen for the next (shorter) question. As far as I can tell this
is not due to my code, nor Hyperapp but a rendering-bug in Safari when using css grid-layouts.


## A guide to reading the code

### Folder structure overview
```
/
    questions.json      -- static file containing the quiz questions
    docs/               -- contains the built app for github pages publishing
        ...
    test/               -- test files
        ...
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
        fx/             -- imperative, impure code defined as Hyperapp effects &
                           subscriptions
            ...

```


### Hyperapp

I implemented this using the [Hyperapp](https://hyperapp.dev) micro-framework. There is a single, global _state_ for the
app which is transformed by dispatching _actions_ in response to DOM events. The DOM is kept in sync with a virtual
DOM, defined as a pure function of the state in the app's `view` function. (For more, see
[the official tutorial](https://hyperapp.dev/tutorial) I wrote, or [this Medium article](https://medium.com/hyperapp/a-walk-through-hyperapp-2-b1f642fca172))

### Functions, No Classes

Hyperapp is based on "[The Elm Architecture](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/38)" and firmly rooted in the functional-programming paradigm. For this reason, thera are no `this` or `class` or `prototype`
in the code.

Everything is just functions, mostly using `const name = arg => ...` rather than `function name (arg) {...}`, and names are almost always `camelCase` (exceptions: see below).


### Model

The logic is split into the model and view parts. The model exports all the actions and queries (computations of values from the state) needed for the app.

For better readability, the actions and queries are composed from helper functions. Related helper functions are grouped and define in separate modules.

By common Hyperapp convention, actions are named using `PascalCase`.


### View

The `view` defines all the desired html for the app as a function of the state. The main view is composed of several components defined and exported in separate modules. 

Queries are imported and used in the main view to calculate proerties passed to the components. Actions are imported directly in the components.

The view and components are writted in [JSX](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx).
The bundler ([parcel-bundler](https://parceljs.org)) automatically understands to transform JSX-syntax into
Hyperapp's native `h` calls. For this reason, any module where I use JSX, I have `import {h} from 'hyperapp'`
although `h` is not explicitly called anywhere. JSX components need to be defined using `PascalCase` to work.

### Effects and Subscriptions

Hyperapp intentionally makes it hard (if not impossible) to use side-effects and imperative browser APIs directly in your actions. Instead you have to wrap this logic in _effects_ and _subscriptions_. I have done this for the random ordering of questions, fetching questions (although it's not a real `fetch` - just a `setTimeout`) and keeping track of the current time. 

