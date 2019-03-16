const express = require('express');
const Event = require('../models/event');
const authMiddleware = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.post('/', async (req, res) => {
    const userId = req.idLogged;
    const { body } = req;
    const { name, description, date } = body;
    await Event.create(name, description, date, userId);

    res.send({event: {name, description, date}});
});

authRouter.put('/', async (req, res) => {
    const { body } = req;
    const { id, name, description, date } = body;
    const result =  await Event.findById(id);

    if (result.rowCount == 0)
        return res.status(404).send({msg: 'Event not found'});

    await Event.update(id, name, description, date);
    res.send({event: {id, name, description, date}});
});


module.exports = (app) => app.use('/api/event', authRouter);