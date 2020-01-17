import { app } from 'hyperapp'
import { init, subscriptions } from './model'
import view from './view'
app({
    node: document.getElementById('app'),
    init,
    view,
    subscriptions,
})
