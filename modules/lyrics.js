const {JSDOM} = require('jsdom')

let cache = {}

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

let dom = (body, callback = () => {}) => {
    let dom = new JSDOM(body)

    let $ = x => Array.from(dom.window.document.querySelectorAll(x))
    let text = x => x ? Array.from(x.childNodes).find(y => y.nodeName === '#text').nodeValue : null

    callback(null, window, $, text)
}

exports.get = function(query, callback = () => {}) {
    if (query in cache)
        return callback(null, cache[query])

    exports.searchFor(query, (err, list) => {
        if (err || list.length == 0)
            return callback(err || new Error('Nothing found'))

        exports.extractFrom(list[0].url, (err, result) => {
            if (err) return callback(err)

            cache[query] = result
            callback(null, result)
        })
    })
}

exports.searchFor = function(query, callback = () => {}) {
    query = encodeURI(query.replace(/\//g, ''))
    let url = `https://musixmatch.com/search/${query}/tracks`

    request(url, (err, response, body) => {
        if (err) return callback(err)

        dom(body, (err, window, $, text) => {
            if (err) return callback(err)

            callback(null, $('.tracks.list li').map(li => li = {
                title: text(li.querySelector('.title span')),
                artist: text(li.querySelector('.artist')),
                url: 'https://musixmatch.com' + li.querySelector('.title').href,
                art: 'https:' + li.querySelector('img').srcset.split(',').splice(-1)[0].trim().split(' ')[0]
            }))
        })
    })
}

exports.extractFrom = function(url, callback = () => {}) {
    request(url, (err, response, body) => {
        if (err) return callback(err)

        dom(body, (err, window, $, text) => {
            if (err) return callback(err)

            callback(null, {
                url,
                title: text($('.mxm-track-title__track')[0]),
                artists: $('.mxm-track-title__artist').map(x => text(x)),
                album: text($('.mxm-track-footer__album h2')[0]),
                art: 'https:' + $('.banner-album-image img')[0].src,
                lyrics: $('.mxm-lyrics__content').map(x => x.textContent).join('\n')
            })
        })
    })
}
