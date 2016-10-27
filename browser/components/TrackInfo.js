const {h} = require('preact')

module.exports = ({title, artists, album, art}) => h('section', {class: 'track-info'},
    h('div', {class: 'drag'}),
    h('img', {
        class: 'art',
        width: 67,
        height: 67,
        src: art
    }),
    h('ul', {},
        h('li', {class: 'title'}, title),
        h('li', {class: 'artists'}, artists.join(', ')),
        h('li', {class: {album: true, disabled: !album}}, album ? album : 'No Album')
    )
)
