function purifyString(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.trim().replace(/\n/g, '').replace(/\s{2,}/gm, ' ');
}

module.exports = purifyString;