const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'Pivnice u Čápa',
    'https://www.pivnice-ucapa.cz/denni-menu.php',
    extractMenu
);

function extractMenu(page) {
    const menus = [];
    const $ = cheerio.load(page);

    const date = getFormattedDate();

    const $dateEl = $('.date').filter(function() {
        return $(this).text().replace(/\s/g, '').includes(date);
    });

    const $row = $dateEl.closest('.row');

    $row.find('.polevka, .food').each(function() {
        menus.push($(this).text());
    });

    return menus;
}

module.exports = pivniceUCapa;
