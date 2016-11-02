const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const TrackInfo = require('./TrackInfo')
const LyricsBox = require('./LyricsBox')

const spotify = require('../../modules/spotify')
const lyrics = require('../../modules/lyrics')

let id = 0

class App extends Component {
    constructor() {
        super()

        this.state = {autoscroll: true}

        spotify.on('song-update', ({track, playing_position}) => {
            let songId = ++id

            this.setState({
                id: songId,
                loading: true,
                title: track.track_resource.name,
                artists: [track.artist_resource.name],
                album: track.album_resource.name,
                art: null,
                lyrics: null,
                url: null,
                position: playing_position,
                total: track.length
            })

            let query = [this.state.title, this.state.artists].join(' ')

            lyrics.get(query, (err, result) => {
                if (err) return this.setState({loading: false})

                result.loading = false

                if (this.state.id == songId)
                    this.setState(result)
            })
        })

        spotify.on('song-progress', ({track, playing_position}) => {
            this.setState({
                position: playing_position,
                total: track.length
            })
        })

        window.addEventListener('load', () => spotify.listen())
    }

    render({}, {loading, title, artists, album, art, lyrics, url, position, total, autoscroll}) {
        return h('div', {id: 'root'},
            h(TitleBar),
            h(TrackInfo, {loading, title, artists, album, art}),
            h('main', {},
                h(LyricsBox, {loading, lyrics, url, position, total, autoscroll}),
                h('div', {class: 'fade-in'}),
                h('div', {class: 'fade-out'})
            )
        )
    }
}

module.exports = App
