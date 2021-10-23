const axios = require('axios');

class Restaurant {
    constructor(name, url, extractMenu) {
        this.name = name;
        this.url = url;
        this.extractMenu = extractMenu;
    }

    scrape() {
        return axios.get(this.url);
    }
}

module.exports = Restaurant;
