const axios = require('axios');
const purifyString = require('../utils/purifyString');

class Restaurant {
    constructor(name, url, extractMenu) {
        this.name = name;
        this.url = url;
        this.extractMenu = extractMenu;
    }

    getMenu() {
        return new Promise((resolve, reject) => {
            (async () => {
                const response = await axios.get(this.url);
                const menu = this.extractMenu(response.data);
                const menuFormatted = this.formatMenu(menu);
                resolve(menuFormatted);
            })();
        });
    }

    formatMenu(menu) {
        return {
            restaurant: this.name.toUpperCase(),
            menu: menu.map(item => purifyString(item))
        }
    }
}

module.exports = Restaurant;
