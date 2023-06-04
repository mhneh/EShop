'use strict';

const controller = {};
const models = require('../models');

controller.showHomepage = async (req, res) => {
    const categories = await models.Category.findAll();
    const secondArray = categories.splice(2, 2);
    const thirdArray = categories.splice(1, 1);
    res.locals.categoryArray = {
        categories,
        secondArray,
        thirdArray
    };

    const featureProducts = await models.Product.findAll({
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
        order: [['stars', 'DESC']],
        limit: 10
    });
    res.locals.featureProducts = featureProducts;

    const recentProducts = await models.Product.findAll({
        attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
        order: [['createdAt', 'DESC']],
        limit: 10
    });
    res.locals.recentProducts = recentProducts;

    const Brand = models.Brand;
    const brands = await Brand.findAll();
    res.render('index', { brands });
}

controller.showPage = (req, res, next) => {
    const pages = ['cart', 'checkout', 'contact', 'login', 'my-account', 'product-detail', 'product-list', 'wishlist'];
    if (pages.includes(req.params.page)) {
        return res.render(req.params.page);
    }
    next();
}

module.exports = controller;