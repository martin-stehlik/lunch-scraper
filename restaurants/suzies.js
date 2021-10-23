const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'Suzie\'s',
    'http://www.suzies.cz/poledni-menu.html',
    extractMenu
);

function extractMenu(page) {
    const $ = cheerio.load(page);
    const menu = [];

    const $date = $('h2').filter(function() {
        return $(this).text().replace(/\s/g, '').includes(getFormattedDate());
    });
    const $row = $date.closest('.item');
    $row.find('.uk-grid-small').each(function() {
        menu.push($(this).text());
    });

    return menu;
}

module.exports = pivniceUCapa;
