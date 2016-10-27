const {h} = require('preact')

module.exports = ({title, artists, album, art}) => h('section', {class: 'track-info'},
    h('div', {class: 'drag'}),
    h('img', {
        class: 'art',
        width: 67,
        height: 67,
        src: art ? art : 'img/blank.svg'
    }),
    h('ul', {},
        h('li', {class: {title: true, disabled: !title}},
            title || 'No Title'
        ),
        h('li', {class: {artists: true, disabled: !artists || !artists.length}},
            artists && artists.length ? artists.join(', ') : 'No Artists'
        ),
        h('li', {class: {album: true, disabled: !album}},
            album || 'No Album'
        )
    )
)
