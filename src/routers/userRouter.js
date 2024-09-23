const express = require('express');
const userRouter = express.Router()
const userControllers = require('../controllers/userControllers')

userRouter.route('/api/login')
    .post((req, res) => {
        userControllers.login(req, res);
    })

userRouter.route('/api/register')
    .post((req, res) => {
        userControllers.createUser(req, res);
    }),

module.exports = userRouter;
