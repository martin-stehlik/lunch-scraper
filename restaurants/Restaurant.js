const axios = require('axios');
const iconv = require('iconv-lite');
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
                    const response = await axios.request({
                        method: 'GET',
                        url: this.url,
                        responseType: 'arraybuffer',
                        reponseEncoding: 'binary'
                    });

                    // Handle encodings
                    const ctype = response.headers['content-type'];
                    if (ctype.includes('charset=windows-1250')) {
                        response.data = iconv.decode(response.data, 'win1250');
                    } else {
                        response.data = iconv.decode(response.data, 'utf-8');
                    }

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
