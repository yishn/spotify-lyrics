const deepEqual = require('deep-equal')
const spotify = new require('node-spotify-webhelper').SpotifyWebHelper()
const EventEmitter = require('events')

let loopId, lastSong

module.exports = exports = new EventEmitter()

exports.start = function() {
    let loop = () => spotify.getStatus((err, result) => {
        if (err || result.error || !result.running) return

        clearTimeout(loopId)
        loopId = setTimeout(loop, (result.track.length - result.playing_position) * 1000 + 100)

        if (deepEqual(lastSong, result.track)) return

        lastSong = result.track
        exports.emit('song-update', result)
    })

    loop()
}

exports.stop = function() {
    clearTimeout(loopId)
}
