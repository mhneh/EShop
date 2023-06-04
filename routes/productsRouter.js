'use strict';

let express = require('express');
let router = express.Router();
let controller = require('../controllers/productsController');
let cartController = require('../controllers/cartController');

router.get('/', controller.getData, controller.show);

router.get('/cart', cartController.show);
router.get('/:id', controller.getData, controller.showDetails);

router.post('/cart', cartController.add);
router.put('/cart', cartController.update);
router.delete('/cart', cartController.remove);
router.delete('/cart/all', cartController.clear);

module.exports = router;