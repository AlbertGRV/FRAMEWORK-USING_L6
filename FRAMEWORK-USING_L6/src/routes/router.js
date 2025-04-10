const routes = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {}
};

function addRoute(method, path, handler) {
    if (!routes[method]) {
        routes[method] = {};
    }
    routes[method][path] = handler;
}

function matchRoute(method, pathname, req) {
    const methodRoutes = routes[method];
    for (const routePath in methodRoutes) { 
        const routeHandler = methodRoutes[routePath];
        const routeSegments = routePath.split('/'); 
        const pathnameSegments = pathname.split('/');

        if (routeSegments.length === pathnameSegments.length) {
            const params = {};
            let isMatch = true;

            for (let i = 0; i < routeSegments.length; i++) {
                if (routeSegments[i].startsWith(':')) { 
                    params[routeSegments[i].slice(1)] = pathnameSegments[i];
                } else if (routeSegments[i] !== pathnameSegments[i]) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) {
                req.params = params;
                return routeHandler;
            }
        }
    }
    return null;
}

module.exports = {
    addRoute,
    matchRoute
}