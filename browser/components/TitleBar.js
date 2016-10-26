const {app} = require('electron').remote
const {h, render, Component} = require('preact')

class Header extends Component {
    render() {
        return h('header', {},
            h('span', {class: 'drag'}),
            h('span', {class: 'title'}, 'Lyrics'),
            h('span', {class: 'close', onclick: () => app.quit()},
                h('img', {
                    src: 'img/close.svg',
                    width: 10,
                    height: 10,
                    title: 'Close'
                })
            )
        )
    }
}

module.exports = Header
