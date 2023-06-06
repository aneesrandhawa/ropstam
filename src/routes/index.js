const express = require('express');
const userRoute = require('./user.route')
const router = express.Router();
const routers = [{
    path: '/user',
    route: userRoute
}]
routers.forEach((route) => {
    router.use(route.path, route.route)
})
module.exports = router