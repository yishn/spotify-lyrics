const {remote} = require('electron')
const {h, render} = require('preact')
const App = require('./components/App')

const win = remote.getCurrentWindow()

if (localStorage.autoscroll == null) {
    localStorage.autoscroll = 'true'
    localStorage.alwaysOnTop = 'false'
}

render(h(App), document.body)

// Save window size

let resizeId

window.addEventListener('resize', function() {
    clearTimeout(resizeId)

    resizeId = setTimeout(() => {
        let [width, height] = win.getContentSize()

        localStorage.width = width
        localStorage.height = height
    }, 1000)
})

window.addEventListener('load', function() {
    let width = +localStorage.width
    let height = +localStorage.height

    if (!isNaN(width) && !isNaN(height))
        win.setContentSize(width, height)

    win.show()
})
