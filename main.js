const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 350,
        height: 500,
        useContentSize: true,
        backgroundColor: '#000',
        show: false
    })

    // window.toggleDevTools()

    window
    .once('ready-to-show', () => window.show())
    .on('closed', () => window = null)
    .webContents
    .on('new-window', evt => evt.preventDefault())

    window.loadURL(`file://${__dirname}/browser/index.html`)
})
