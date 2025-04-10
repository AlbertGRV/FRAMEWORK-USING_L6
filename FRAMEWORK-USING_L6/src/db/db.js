const fs = require('fs');
const productPath = 'src/db/product.json';
const customerPath = 'src/db/customer.json';

exports.readProduct = () => {
    const data = fs.readFileSync(productPath, 'utf8');
    return JSON.parse(data);
};
exports.readCustomer = () => {
    const data = fs.readFileSync(customerPath, 'utf8');
    return JSON.parse(data);
};

exports.writeProduct = (data) => {
    fs.writeFileSync(productPath, JSON.stringify(data, null, 2), 'utf8');
};
exports.writeCustomer = (data) => {
    fs.writeFileSync(customerPath, JSON.stringify(data, null, 2), 'utf8');
};