const {app} = require('electron').remote
const {h, render, Component} = require('preact')

class Header extends Component {
    render() {
        return h('header', {},
            h('span', {className: 'drag'}),
            h('span', {className: 'title'}, 'Lyrics'),
            h('span', {className: 'close', onclick: () => app.quit()},
                h('img', {
                    src: 'close.svg',
                    width: 10,
                    height: 10,
                    title: 'Close'
                })
            )
        )
    }
}

module.exports = Header
