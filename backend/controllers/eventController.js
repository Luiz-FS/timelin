const express = require('express');
const Event = require('../models/event');
const authMiddleware = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.post('/', async (req, res) => {
    const userId = req.idLogged;
    const { body } = req;
    const { name, description, event_date , color } = body;
    await Event.create(name, description, event_date, color, userId);

    res.send({event: {name, description, event_date, color}});
});

authRouter.put('/:eventID', async (req, res) => {
    const { body } = req;
    const { name, description, event_date, color } = body;
    const id = req.params.eventID;
    const result =  await Event.findById(id);

    if (result.rowCount == 0)
        return res.status(404).send({msg: 'Event not found'});

    await Event.update(id, name, description, event_date, color);
    res.send({event: {id, name, description, event_date, color}});
});

authRouter.delete('/:eventID', async (req, res) => {
    const id = req.params.eventID;
    const result =  await Event.findById(id);

    if (result.rowCount == 0)
        return res.status(404).send({msg: 'Event not found'});
    
    await Event.delete(id);
    res.send();
});


module.exports = (app) => app.use('/api/event', authRouter);