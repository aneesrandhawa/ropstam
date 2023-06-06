const jwt = require('jsonwebtoken')
const config = require('../config/config')

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        const tokenVerify = await jwt.verify(token, config.jwt.secret)
        console.log(tokenVerify)
        console.log(tokenVerify.id)
        next();
    } catch (error) {
        console.log("error")
        res.send(error)
    }

}
module.exports = auth