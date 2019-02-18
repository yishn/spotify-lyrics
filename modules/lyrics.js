const request = require('request')
const {JSDOM} = require('jsdom')

let cache = {}

let req = async url => new Promise((resolve, reject) => request({
    url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.148 Safari/537.36 Vivaldi/1.4.589.38'
    }
}, (err, response, body) => {
    if (err || response.statusCode != 200)
        return reject(err || new Error('Lyrics unavailable'))

    resolve({response, body})
}))

let dom = body => {
    let dom = new JSDOM(body)

    let $ = x => Array.from(dom.window.document.querySelectorAll(x))
    let text = x => x ? Array.from(x.childNodes).find(y => y.nodeName === '#text').nodeValue : null

    return {window, $, text}
}

exports.get = async function(query) {
    if (query in cache)
        return cache[query]

    let list = await exports.searchFor(query)
    let result = await exports.extractFrom(list[0].url)

    cache[query] = result
    return result
}

exports.searchFor = async function(query) {
    let url = `https://musixmatch.com/search/${encodeURIComponent(query)}/tracks`
    let {body} = await req(url)
    let {$, text} = dom(body)

    return $('.tracks.list li').map(li => li = {
        title: text(li.querySelector('.title span')),
        artist: text(li.querySelector('.artist')),
        url: 'https://musixmatch.com' + li.querySelector('.title').href,
        art: 'https:' + li.querySelector('img').srcset.split(',').splice(-1)[0].trim().split(' ')[0]
    })
}

exports.extractFrom = async function(url) {
    let {body} = await req(url)
    let {$, text} = dom(body)

    return {
        url,
        title: text($('.mxm-track-title__track')[0]),
        artists: $('.mxm-track-title__artist').map(x => text(x)),
        album: text($('.mxm-track-footer__album h2')[0]),
        art: 'https:' + $('.banner-album-image img')[0].src,
        lyrics: $('.mxm-lyrics__content').map(x => x.textContent).join('\n')
    }
}
