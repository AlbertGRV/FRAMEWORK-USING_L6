const createApp = require('./src/app/createApp');
const customerRoutes = require('./src/routes/v1/customerRoutes');
const productService = require('./src/routes/v1/productRoutes');
const logger = require('./src/middlewares/logger');

const app = createApp();

app.use(logger);
customerRoutes(app);
productService(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});