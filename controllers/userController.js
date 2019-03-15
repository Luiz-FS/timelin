const express = require('express');
const db = require('../db');

const openRouter = express.Router();


openRouter.get('/', async (req, res) => {
    const { rows } = await db.query("SELECT * FROM usermodel WHERE name = 'Luiz'");
    console.log(rows);
    res.send({user: rows[0]});
});

module.exports = app => app.use('/user', openRouter);
