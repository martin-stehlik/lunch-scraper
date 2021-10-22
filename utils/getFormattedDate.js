function getFormattedDate(withSpace = false) {
    const date = new Date();
    const space = withSpace ? ' ' : '';

    return `${date.getDate()}.${space}${date.getMonth() + 1}.${space}${date.getFullYear()}`;
}

module.exports = getFormattedDate;
