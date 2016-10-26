const fs = require('fs')
const jsdom = require('jsdom')

let request = (url, callback = () => {}) => require('request')({
    url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.148 Safari/537.36 Vivaldi/1.4.589.38'
    }
}, (err, response, body) => {
    if (err || response.statusCode != 200)
        return callback(err || new Error('Lyrics unavailable'))

    callback(null, response, body)
})

exports.searchFor = function(query, callback = () => {}) {
    let url = `https://musixmatch.com/search/${encodeURI(query)}/tracks`

    request(url, (err, response, body) => {
        if (err) return callback(err)
    })
}

exports.extractFrom = function(url, callback = () => {}) {
    request(url, (err, response, body) => {
        if (err) return callback(err)

        jsdom.env(body, (err, window) => {
            if (err) return callback(err)

            let $ = x => Array.from(window.document.querySelectorAll(x))
            let getTextNode = x => x ? Array.from(x.childNodes).find(y => y.nodeName == '#text').nodeValue : null

            let title = getTextNode($('.mxm-track-title__track')[0])
            let artists = $('.mxm-track-title__artist').map(x => getTextNode(x))
            let album = getTextNode($('.mxm-track-footer__album h2')[0])
            let albumCover = 'http:' + $('.banner-album-image img')[0].src
            let lyrics = $('.mxm-lyrics__content').map(x => getTextNode(x)).join('\n\n')

            callback(null, {title, artists, album, albumCover, lyrics})
        })
    })
}
