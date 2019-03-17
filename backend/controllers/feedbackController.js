const express = require('express');
const authMiddleware = require('../middlewares/auth');
const feedback = require('../models/feedback');

const openRouter = express.Router();
const authRouter = express.Router();

authRouter.use(authMiddleware);

openRouter.get('/', async (req, res) => {
    const { rows } = await feedback.getAll();
    res.send(rows);
});

authRouter.post('/', async (req, res) => {
    const id = req.idLogged;
    const { description } = req.body;
    await feedback.create(id, description);
    res.send({feedback: {description}});
});

module.exports = (app) => app.use('/api/feedback', openRouter, authRouter);