const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'Pivnice u Čápa',
    'https://www.pivnice-ucapa.cz/denni-menu.php',
    extractMenu
);

function extractMenu(page) {
    const $ = cheerio.load(page);
    const menu = [];

    const $date = $('.date').filter(function() {
        return $(this).text().replace(/\s/gm, '').includes(getFormattedDate());
    });
    const $row = $date.closest('.row');
    $row.find('.row').each(function() {
        menu.push($(this).text());
    });

    return menu;
}

module.exports = pivniceUCapa;
