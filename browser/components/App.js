const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const TrackInfo = require('./TrackInfo')
const LyricsBox = require('./LyricsBox')

const spotify = require('../../modules/spotify')
const lyrics = require('../../modules/lyrics')

class App extends Component {
    constructor() {
        super()

        spotify.on('song-update', ({track}) => {
            this.state = {}
            this.setState({
                loading: true,
                title: track.track_resource.name,
                artists: [track.artist_resource.name],
                album: track.album_resource.name
            })

            let query = [this.state.title, this.state.artists].join(' ')

            lyrics.get(query, (err, result) => {
                if (err) return this.setState({loading: false})

                result.loading = false
                this.setState(result)
            })
        })

        spotify.listen()
    }

    render({}, {loading, title, artists, album, art, lyrics}) {
        return h('div', {id: 'root'},
            h(TitleBar),
            h(TrackInfo, {loading, title, artists, album, art}),
            h(LyricsBox, {loading, lyrics})
        )
    }
}

module.exports = App
