const fs = require('fs')

let components = fs.readdirSync(__dirname)
    .filter(x => x[0] == x[0].toUpperCase())
    .map(x => x.slice(0, x.length - 3))

components.forEach(x => module.exports[x] = require(`./${x}`))
