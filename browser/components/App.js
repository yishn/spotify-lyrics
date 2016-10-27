const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const TrackInfo = require('./TrackInfo')
const LyricsBox = require('./LyricsBox')

class App extends Component {
    render() {
        return h('div', {id: 'root'},
            h(TitleBar, {
                title: ''
            }),

            h(TrackInfo, {
                title: 'Million Reasons',
                artists: ['Lady Gaga'],
                album: 'Joanne',
                art: 'https://s.mxmcdn.net/images-storage/albums/7/4/4/4/7/1/35174447_350_350.jpg'
            }),

            h(LyricsBox, {
                // lyrics: require('fs').readFileSync(require('path').join(__dirname, '../../lyrics.txt'), 'utf-8')
            })
        )
    }
}

module.exports = App
