const {h} = require('preact')
let words

module.exports = ({loading, lyrics}) =>

h('section', {class: {'lyrics-box': true, loading}},
    h('p', {class: 'placeholder'}),
    lyrics
    ? lyrics.split('\n').map(line =>
        (line = line.trim()) == ''
        ? h('br')
        : h('p', {},
            (words = line.split(/\s+/)).slice(0, words.length - 2).join(' ') + ' ',
            h('span', {}, words.splice(-2).join(' '))
        )
    )
    : loading
    ? h('div', {class: 'spinner'}, h('div'), h('div'), h('div'))
    : h('p', {class: 'no-lyrics'}, 'No Lyrics'),
    h('p', {class: 'placeholder'})
)
