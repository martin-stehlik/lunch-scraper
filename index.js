const axios = require('axios');
const cheerio = require('cheerio');
const getFormattedDate = require('./utils/getFormattedDate');

const menus = [];

async function getHtml() {
    const response = await axios.get('https://www.pivnice-ucapa.cz/denni-menu.php');
    const $ = cheerio.load(response.data);

    const date = getFormattedDate(true);

    const $dateEl = $(`.date:contains(${date})`);

    const $row = $dateEl.closest('.row');
    $row.find('.polevka, .food').each(function() {
        menus.push($(this).text());
    });

    console.log(menus);

}

getHtml();


/*
https://www.pivnice-ucapa.cz/denni-menu.php
http://www.suzies.cz/poledni-menu.html
https://www.menicka.cz/4921-veroni-coffee--chocolate.html
*/
