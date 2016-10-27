const {h} = require('preact')
let words

module.exports = ({lyrics}) => h('section', {class: 'lyrics-box'},
    lyrics
    ? lyrics.split('\n').map(line =>
        (line = line.trim()) == ''
        ? h('br')
        : h('p', {},
            (words = line.split(/\s+/)).slice(0, words.length - 2).join(' ') + ' ',
            h('span', {}, words.splice(-2).join(' '))
        )
    )
    : h('p', {class: {'no-lyrics': true, disabled: !lyrics}}, 'No Lyrics')
)
