const {shell} = require('electron')
const {h} = require('preact')
const smartypants = require('../../modules/smartypants')

let words

module.exports = ({loading, lyrics, url}) =>

h('section', {class: {'lyrics-box': true, loading}},
    h('p', {class: 'placeholder'}),
    lyrics
    ? smartypants(lyrics).split('\n').map(line =>
        (line = line.trim()) == ''
        ? h('br')
        : h('p', {class: {parentheses: line[0] == '(' && line[line.length - 1] == ')'}},
            (words = line.split(/\s+/)).slice(0, words.length - 2).join(' ') + ' ',
            h('span', {}, words.splice(-2).join(' '))
        )
    )
    : loading
    ? h('div', {class: 'spinner'}, h('div'), h('div'), h('div'))
    : h('p', {class: 'no-lyrics'}, 'No Lyrics'),

    lyrics && h('p', {class: 'end'}, 'End'),

    lyrics && h('a', {
        class: 'badge',
        href: '#',
        title: 'Powered by Musixmatch',
        onclick: e => {
            e.preventDefault()
            shell.openExternal(url)
        }
    }, h('img', {src: 'img/badge.svg'})),

    lyrics && h('p', {class: 'placeholder'})
)
