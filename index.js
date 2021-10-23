const restaurants = [
    require('./restaurants/pivniceUCapa'),
    require('./restaurants/suzies'),
    require('./restaurants/veroni')
];

async function getMenus() {
    const menus = await Promise.all(
        restaurants.map(restaurant => restaurant.getMenu())
    );

    console.log(menus);
}

getMenus();
