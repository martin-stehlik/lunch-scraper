const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'Suzie\'s',
    'http://www.suzies.cz/poledni-menu.html',
    extractMenu
);

function extractMenu(page) {
    const menus = [];
    const $ = cheerio.load(page);

    const date = getFormattedDate();

    const $dateEl = $('h2').filter(function() {
        return $(this).text().replace(/\s/g, '').includes(date);
    });

    const $row = $dateEl.closest('.item');

    $row.find('.uk-width-expand').each(function() {
        menus.push($(this).text().trim().replace(/\n/g, '').replace(/\s{2,}/gm, ' '));
    });

    return menus;
}

module.exports = pivniceUCapa;
