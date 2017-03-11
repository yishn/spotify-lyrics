const spotify = new require('node-spotify-webhelper').SpotifyWebHelper()
const EventEmitter = require('events')

let loopId, lastSongId

module.exports = exports = new EventEmitter()

let getTrackId = track => ['track', 'artist', 'album'].map(x => track[x + '_resource'].uri)
let equals = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

exports.listen = function() {
    let loop = () => spotify.getStatus((err, result) => {
        if (err || result.error || !result.running) return

        clearTimeout(loopId)
        loopId = setTimeout(loop, Math.min(result.track.length - result.playing_position, 1) * 1000)

        if (equals(lastSongId, getTrackId(result.track)))
            return exports.emit('song-progress', result)

        lastSongId = getTrackId(result.track)
        exports.emit('song-update', result)
    })

    loop()
}

exports.stop = function() {
    clearTimeout(loopId)
}
