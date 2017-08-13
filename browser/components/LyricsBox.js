const {shell} = require('electron')
const {h, Component} = require('preact')
const scroll = require('scroll')
const smartypants = require('../../modules/smartypants')

class LyricsBox extends Component {
    componentDidUpdate(prevProps) {
        if (!this.props.autoscroll) return

        if (prevProps.lyrics != this.props.lyrics) {
            this.lastScrollTop = null
            this.lastTimePosition = null
            scroll.top(this.element, 0)
            return
        }

        let userChanged = this.lastScrollTop != null && Math.abs(this.element.scrollTop - this.lastScrollTop) > 10
        let scrollTop = this.element.scrollTop

        if (!userChanged) {
            let {position, total} = this.props
            let relativeProgress = (position - this.lastTimePosition) / (total - this.lastTimePosition)
            let remainingPx = this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop
            let deltaPx = relativeProgress * remainingPx

            scrollTop += deltaPx

            if (position < 1) scrollTop = 0
        }

        this.lastScrollTop = scrollTop
        this.lastTimePosition = this.props.position
        scroll.top(this.element, scrollTop)
    }

    render({loading, lyrics, url, progress}) {
        let words
        
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
                    h('span', {}, words.slice(-2).join(' '))
                )
            )
            : loading
            ? h('div', {class: 'spinner'}, h('div'), h('div'), h('div'))
            : h('p', {class: 'no-lyrics'}, 'No Lyrics'),

            lyrics && h('p', {class: 'end'}, 'End'),

            lyrics && h('div', {class: 'powered-by'}, 'Powered by'),
            lyrics && h('a', {
                class: 'badge',
                href: '#',
                onClick: e => {
                    e.preventDefault()
                    shell.openExternal(url)
                }
            }, h('img', {src: 'img/badge.svg'})),

            lyrics && h('p', {class: 'placeholder'})
        ])
    }
}

module.exports = LyricsBox
