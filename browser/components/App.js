const {h, render, Component} = require('preact')
const TitleBar = require('./TitleBar')

class App extends Component {
    render() {
        return h('div', {id: 'root'},
            h(TitleBar, {title: 'Spotify Lyrics'})
        )
    }
}

module.exports = App
