const {h} = require('preact')

module.exports = ({lyrics}) => h('section', {class: 'lyrics-box'},
    lyrics.split('\n').map(line =>
        line.trim() == ''
        ? h('br')
        : h('p', {},
            line.split(' ').slice(0, line.split(' ').length - 2).join(' ') + ' ',
            h('span', {}, line.split(' ').splice(-2).join(' '))
        )
    )
)
