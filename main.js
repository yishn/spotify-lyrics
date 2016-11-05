const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 350,
        height: 450,
        useContentSize: true,
        backgroundColor: '#121212',
        maximizable: false,
        frame: false,
        show: false
    })

    // window.toggleDevTools()

    window
    .on('closed', () => window = null)
    .webContents
    .on('new-window', evt => evt.preventDefault())

    window.loadURL(`file://${__dirname}/browser/index.html`)
})
