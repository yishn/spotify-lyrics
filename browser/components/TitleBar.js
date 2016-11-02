const {app} = require('electron').remote
const {h} = require('preact')

module.exports = ({title}) =>

h('header', {},
    h('span', {class: 'drag'}),
    h('span', {class: 'title'}, title || ''),
    h('span', {class: 'close', onClick: () => app.quit()},
        h('img', {
            src: 'img/close.svg',
            width: 10,
            height: 10,
            title: 'Close'
        })
    )
)
