const cheerio = require('cheerio');
const Restaurant = require('./Restaurant');
const getFormattedDate = require('../utils/getFormattedDate');

const pivniceUCapa = new Restaurant(
    'VERONI coffee & chocolate',
    'https://www.menicka.cz/4921-veroni-coffee--chocolate.html',
    extractMenu
);

function extractMenu(page) {
    const $ = cheerio.load(page);
    const menu = [];

    const $date = $('.menicka .nadpis').filter(function() {
        return $(this).text().replace(/\s/gm, '').includes(getFormattedDate());
    });
    const $row = $date.closest('.menicka');
    $row.find('.polevka, .jidlo').each(function() {
        menu.push($(this).text());
    });

    return menu;
}

module.exports = pivniceUCapa;
