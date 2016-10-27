const {h} = require('preact')

module.exports = ({loading, title, artists, album, art}) =>

h('section', {class: {'track-info': true, loading}},
    h('div', {class: 'drag'}),
    h('img', {
        class: 'art',
        src: art ? art : 'img/blank.svg'
    }),
    h('ul', {},
        h('li', {class: {title: true, disabled: !title}},
            title || (loading ? '…' : 'No Title')
        ),
        h('li', {class: {artists: true, disabled: !artists || !artists.length}},
            artists && artists.length ? artists.join(', ') : (loading ? '…' : 'No Artists')
        ),
        h('li', {class: {album: true, disabled: !album}},
            album || (loading ? '…' : 'No Album')
        )
    )
)
