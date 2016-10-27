const {shell} = require('electron')
const {h, Component} = require('preact')
const scroll = require('scroll')
const smartypants = require('../../modules/smartypants')

let words

class LyricsBox extends Component {
    componentDidUpdate() {
        if (this.props.loading) {
            this.lastScrollTop = null
            this.lastTimePosition = null
            return
        }

        let userChanged = this.lastScrollTop != null && Math.abs(this.element.scrollTop - this.lastScrollTop) > 10
        let scrollTop = this.element.scrollTop

        if (!userChanged) {
            let deltaTime = this.props.position - this.lastTimePosition
            let lastRemaining = this.props.total - this.lastTimePosition
            let progress = deltaTime / lastRemaining
            let remainingPx = this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop
            let deltaPx = progress * remainingPx

            scrollTop += deltaPx
        }

        this.lastScrollTop = scrollTop
        this.lastTimePosition = this.props.position
        scroll.top(this.element, scrollTop)
    }

    render({loading, lyrics, url, progress}) {
        return h('section', {
            class: {'lyrics-box': true, loading},
            ref: el => this.element = el,
            'data-progress': progress
        }, [
            lyrics && h('p', {class: 'placeholder'}),

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
        ])
    }
}

module.exports = LyricsBox
