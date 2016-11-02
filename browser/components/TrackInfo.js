const {h, Component} = require('preact')
const smartypants = require('../../modules/smartypants')

class TrackInfo extends Component {
    render({loading, title, artists, album, art}) {
        let titleText = smartypants(title || (loading ? '…' : 'No Title'))
        let artistsText = smartypants(artists && artists.length ? artists.join(', ') : (loading ? '…' : 'No Artists'))
        let albumText = smartypants(album || (loading ? '…' : 'No Album'))

        return h('section', {class: {'track-info': true, loading}},
            h('div', {class: 'drag'}),
            h('img', {
                class: 'art',
                src: 'img/blank.svg',
                style: {
                    backgroundImage: art ? `url('${art}')` : "url('img/blank.svg')"
                }
            }),
            h('ul', {},
                h('li', {class: {title: true, disabled: !title}, title: titleText},
                    titleText
                ),
                h('li', {class: {artists: true, disabled: !artists || !artists.length}, title: artistsText},
                    artistsText
                ),
                h('li', {class: {album: true, disabled: !album}, title: albumText},
                    albumText
                )
            )
        )
    }
}

module.exports = TrackInfo
