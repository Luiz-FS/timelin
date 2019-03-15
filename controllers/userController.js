const express = require('express');
const User = require('../models/user');

const openRouter = express.Router();

openRouter.get('/', async (req, res) => {
    const { rows } = await User.findByName('Luiz');
    res.send({user: rows[0]});
});

openRouter.post('/', async (req, res) => {
    const { body } = req;
    const { name, email, password } = body;
    const result = await User.findByEmail(email);
    if (result.rowCount > 0) {
        res.status(401);
        res.send({msg: 'User alread exists'});
    } else {
        await User.create(name, email, password);
        res.send({user: {name, email}});
    }
});

module.exports = app => app.use('/user', openRouter);
