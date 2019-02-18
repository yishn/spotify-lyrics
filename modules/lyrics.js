const request = require('request')
const {JSDOM} = require('jsdom')

let cache = {}

let domRequest = async url => {
    let {response, body} = await new Promise((resolve, reject) =>
        request({
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.148 Safari/537.36 Vivaldi/1.4.589.38'
            }
        }, (err, response, body) => err ? reject(err) : resolve({response, body}))
    )

    if (response.statusCode != 200) throw new Error('Lyrics unavailable')

    let dom = new JSDOM(body, {url})
    let $$ = x => [...dom.window.document.querySelectorAll(x)]
    let text = x => x ? [...x.childNodes].find(y => y.nodeName === '#text').nodeValue : null

    resolve({$$, text})
}

exports.get = async function(query) {
    if (query in cache) return cache[query]

    let list = await exports.searchFor(query)
    let result = await exports.extractFrom(list[0].url)

    cache[query] = result
    return result
}

exports.searchFor = async function(query) {
    let url = `https://musixmatch.com/search/${encodeURIComponent(query)}/tracks`
    let {$$, text} = await domRequest(url)

    return $$('.tracks.list li').map(li => ({
        title: text(li.querySelector('.title span')),
        artist: text(li.querySelector('.artist')),
        url: li.querySelector('.title').href,
        art: li.querySelector('img').srcset.split(',').splice(-1)[0].trim().split(' ')[0]
    }))
}

exports.extractFrom = async function(url) {
    let {$$, text} = await domRequest(url)

    return {
        url,
        title: text($$('.mxm-track-title__track')[0]),
        artists: $$('.mxm-track-title__artist').map(x => text(x)),
        album: text($$('.mxm-track-footer__album h2')[0]),
        art: $$('.banner-album-image img')[0].src,
        lyrics: $$('.mxm-lyrics__content').map(x => x.textContent).join('\n')
    }
}
