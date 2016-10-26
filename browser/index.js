const {remote} = require('electron')
const {app} = remote
const $ = x => Array.from(document.querySelectorAll(x))

$('header .close')[0].addEventListener('click', () => app.quit())
