const {remote} = require('electron')
const {h, render} = require('preact')
const App = require('./components/App')

const win = remote.getCurrentWindow()
const defaultConfig = {
    autoscroll: true,
    alwaysOnTop: false
}

for (let key in defaultConfig) {
    if (localStorage[key] == null) {
        localStorage[key] = defaultConfig[key]
    }
}

render(h(App), document.body)

// Save window size

let resizeId

window.addEventListener('resize', () => {
    clearTimeout(resizeId)

    resizeId = setTimeout(() => {
        let [width, height] = win.getContentSize()

        localStorage.width = width
        localStorage.height = height
    }, 1000)
})

window.addEventListener('load', () => {
    let width = +localStorage.width
    let height = +localStorage.height

    if (!isNaN(width) && !isNaN(height))
        win.setContentSize(width, height)

    win.show()
})
