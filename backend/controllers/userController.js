const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Event = require('../models/event');
const Utils = require('../util/utils');

const authRouter = express.Router();
const openRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/', async (req, res) => {
    const id = req.idLogged;
    const { rows } = await User.findById(id);
    return res.send({user: rows[0]});
});

authRouter.put('/', async (req, res) => {
    const id = req.idLogged;
    const { name, email } = req.body;
    
    await User.update(id, name, email);
    return res.send({user: {name, email}});
});

authRouter.put('/reset-password', async (req, res) => {
    const id = req.idLogged;
    const { actualPass, newPass } = req.body;
    const result = await User.checkCredentialsById(id, actualPass);

    if (result.rowCount === 0) {
        return res.status(403).send({msg: 'Invalid password'});
    }

    await User.updatePassword(id, newPass);
    return res.send();
});

openRouter.post('/', async (req, res) => {
    const { body } = req;
    const { name, email, password } = body;
    const result = await User.findByEmail(email);

    if (result.rowCount > 0) {
        return res.status(401).send({msg: 'User alread exists'});
    } else {
        await User.create(name, email, password);
        const { rows } = await User.checkCredentials(email, password);
        const user = rows[0];
        const token = Utils.generateToken({id: user.id});
        return res.send({user: {name, email, token}});
    }
});

authRouter.get('/events', async (req, res) => {
    const id = req.idLogged;
    const { rows } =  await Event.findByUserId(id);
    
    return res.send(rows);
});

module.exports = app => app.use('/api/user', openRouter, authRouter);
