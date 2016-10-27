const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const TrackInfo = require('./TrackInfo')
const LyricsBox = require('./LyricsBox')

class App extends Component {
    render({}, {title, artists, album, art, lyrics}) {
        return h('div', {id: 'root'},
            h(TitleBar),
            h(TrackInfo, {title, artists, album, art}),
            h(LyricsBox, {lyrics})
        )
    }
}

module.exports = App
