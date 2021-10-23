const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'VERONI coffee & chocolate',
    'https://www.menicka.cz/4921-veroni-coffee--chocolate.html',
    extractMenu
);

function extractMenu(page) {
    const menus = [];
    const $ = cheerio.load(page);

    const date = getFormattedDate();

    const $dateEl = $('.menicka .nadpis').filter(function() {
        return $(this).text().replace(/\s/g, '').includes(date);
    });

    const $row = $dateEl.closest('.menicka');

    $row.find('.polozka').each(function() {
        menus.push($(this).text());
    });

    return menus;
}

module.exports = pivniceUCapa;
