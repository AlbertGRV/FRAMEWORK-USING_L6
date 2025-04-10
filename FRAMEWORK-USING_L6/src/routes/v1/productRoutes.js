const { getProduct, getProductById, postProduct, putAndPatchProductById, deleteProductById} = require('../../controllers/v1/productController');

module.exports = (app) => {
    app.get('/v1/products', getProduct);
    app.get('/v1/product/:id', getProductById);
    app.post('/v1/product', postProduct);
    app.put('/v1/product/:id', putAndPatchProductById);
    app.patch('/v1/product/:id', putAndPatchProductById);
    app.delete('/v1/product/:id', deleteProductById);
};