function purifyString(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.replace(/\n/g, '').replace(/\s{2,}/gm, ' ').trim();
}

module.exports = purifyString;