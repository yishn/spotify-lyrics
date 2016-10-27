module.exports = function smartyPants(text) {
    return text
        .replace(/\.{3}/g, '…')
        .replace(/(\S)'/g, '$1’')
        .replace(/(\S)"/g, '$1”')
        .replace(/'(\S)/g, '‘$1')
        .replace(/"(\S)/g, '“$1')
        .replace(/(\s)-(\s)/g, '$1–$2')
}
