const fs = require('fs');
const getFormattedDate = require('./utils/getFormattedDate');

const restaurants = [
    require('./restaurants/pivniceUCapa'),
    require('./restaurants/suzies'),
    require('./restaurants/veroni')
];

async function getMenus() {
    const promises = await Promise.allSettled(
        restaurants.map(restaurant => restaurant.getMenu())
    );

    const menus = promises.map(promise => promise.value || promise.reason);

    console.log(`Menus for ${getFormattedDate()}:`);
    console.log(menus);

    fs.writeFile(
        './output/todayMenus.json',
        JSON.stringify(menus, null, 4),
        (err) => {
            if (err) throw err;
            console.log('You can find the menus in output/todayMenus.json')
        }
    );
}

getMenus();
