const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Event = require('../models/event');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/', async (req, res) => {
    const id = req.idLogged;
    const { rows } = await User.findById(id);
    return res.send({user: rows[0]});
});

openRouter.post('/', async (req, res) => {
    const { body } = req;
    const { name, email, password } = body;
    const result = await User.findByEmail(email);

    if (result.rowCount > 0) {
        return res.status(401).send({msg: 'User alread exists'});
    } else {
        await User.create(name, email, password);
        return res.send({user: {name, email}});
    }
});

authRouter.get('/events', async (req, res) => {
    const id = req.idLogged;
    const { rows } =  await Event.findByUserId(id);
    
    return res.send(rows);
});

module.exports = app => app.use('/user', openRouter, authRouter);
