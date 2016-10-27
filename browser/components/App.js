const {h, render, Component} = require('preact')
const TitleBar = require('./TitleBar')
const TrackInfo = require('./TrackInfo')

class App extends Component {
    render() {
        return h('div', {id: 'root'},
            h(TitleBar, {title: 'Spotify Lyrics'}),
            h(TrackInfo, {
                title: 'Million Reasons',
                artists: ['Lady Gaga'],
                album: 'Joanne',
                art: 'https://s.mxmcdn.net/images-storage/albums/7/4/4/4/7/1/35174447_350_350.jpg'
            })
        )
    }
}

module.exports = App
