function getFormattedDate() {
    const date = new Date();
    return '25.10.2021';
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

module.exports = getFormattedDate;
