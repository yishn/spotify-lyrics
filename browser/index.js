const {h, render} = require('preact')
const App = require('./components/App')

if (localStorage.autoscroll == null) {
    localStorage.autoscroll = 'true'
    localStorage.alwaysOnTop = 'false'
}

render(h(App), document.body)
