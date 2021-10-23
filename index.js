const pivniceUCapa = require('./scrapers/pivniceUCapa');
const suzies = require('./scrapers/suzies');
const veroni = require('./scrapers/veroni');

async function getMenus() {
    const [uCapaResp, suzieResp, veroniResp] = await Promise.all([
        pivniceUCapa.scrape(),
        suzies.scrape(),
        veroni.scrape()
    ]);

    console.log(pivniceUCapa.extractMenu(uCapaResp.data));
    console.log(suzies.extractMenu(suzieResp.data));
    console.log(veroni.extractMenu(veroniResp.data));
}

getMenus();


// https://stackoverflow.com/questions/43036229/is-it-an-anti-pattern-to-use-async-await-inside-of-a-new-promise-constructor
// https://stackoverflow.com/questions/57204895/how-to-fire-multiple-api-calls-asynchronously-at-the-same-time/57205276