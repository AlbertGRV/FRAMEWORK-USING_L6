const { getCustomer, getCustomerById, postCustomer, putAndPatchCustomerById, deleteCustomerById} = require('../../controllers/v1/customerController');

module.exports = (app) => {
    app.get('/v1/customers', getCustomer);
    app.get('/v1/customer/:id', getCustomerById);
    app.post('/v1/customer', postCustomer);
    app.put('/v1/customer/:id', putAndPatchCustomerById);
    app.patch('/v1/customer/:id', putAndPatchCustomerById);
    app.delete('/v1/customer/:id', deleteCustomerById);
};