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
                try {
                    const response = await axios.get(this.url);
                    const menu = this.extractMenu(response.data);
                    resolve(this.formatMenu(menu));
                } catch (err) {
                    reject(this.formatError(err));
                }
            })();
        });
    }

    formatMenu(menu) {
        return {
            restaurant: this.name.toUpperCase(),
            menu: menu.map(item => purifyString(item))
        }
    }

    formatError(error) {
        return {
            restaurant: this.name.toUpperCase(),
            error: error.message
        }
    }
}

module.exports = Restaurant;
