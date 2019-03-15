const express = require('express');

const openRouter = express.Router();


openRouter.get('/', async (req, res) => {
    res.send({user: 'luiz'});
});

module.exports = app => app.use('/user', openRouter);
