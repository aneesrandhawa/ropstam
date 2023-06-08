const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router();
/**
 * 
@swagger
 * /user/register:
 *   post:
 *     summary: Register a User
 *     description: Register a User
 *     parameters:
 *      - name: firstName
 *      - name: lastName
 *      - name: email
 *     schema:
 *     type: string
 *     responses:
 *       200:
 *         description: Successful response
* /user/signin:
 *   post:
 *     summary: User Log in
 *     description: Log in
 *     parameters:
 *      - name: username
 *      - name: password
 *     schema:
 *     type: string 
 *     responses:
 *       200:
 *         description: Successful response

*/
router
.route('/register')
.post(userController.registerUser)
router
.route('/login')
.post(userController.login)


module.exports = router