const http = require('node:http');
const url = require('node:url');
const { addRoute, matchRoute } = require('../routes/router');

const middlewares = [];

function createApp() {
    const app = {
        get: (path, handler) => addRoute('GET', path, handler),
        post: (path, handler) => addRoute('POST', path, handler),
        put: (path, handler) => addRoute('PUT', path, handler),
        patch: (path, handler) => addRoute('PATCH', path, handler),
        delete: (path, handler) => addRoute('DELETE', path, handler),
        use: (middleware) => {
            middlewares.push(middleware);
        },
        listen: (port, callback) => {
            const server = http.createServer((req, res) => {
                req.body = '';
                req.params = {};
                req.query = {};
                const parsedUrl = url.parse(req.url, true);
                req.query = parsedUrl.query;

                res.send = (data) => {
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(data);
                };
                res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                };
                res.status = (code) => {
                    res.statusCode = code;
                    return res;
                };
                req.on('data', chunk => {
                    req.body += chunk.toString();
                });
                req.on('end', () => {
                    const method = req.method;
                    const pathname = parsedUrl.pathname;
                    let index = 0;
                    const next = (err) => {
                        if (err) {
                            console.error(`Ошибка: ${err.message}`);
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
                            return;
                        }
                        if (index < middlewares.length) {
                            middlewares[index++](req, res, next);
                        } else {
                            const handler = matchRoute(method, pathname, req);
                            if (handler) {
                                handler(req, res, next);
                            } else {
                                res.writeHead(404, {'Content-Type': 'application/json'});
                                console.log('Ответ: Не найдено');
                                res.end(JSON.stringify({ error: 'Not Found', message: 'Маршрут не найден' }));
                            }
                        }
                    };
                    next();
                });
            });

            server.listen(port, () => {
                console.log(`Сервер работает на порту ${port}`);
                if (callback) {
                    callback();
                }
            });
        }
    };
    return app;
}

module.exports = createApp;