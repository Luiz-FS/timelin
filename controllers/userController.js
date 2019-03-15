const express = require('express');
const db = require('../db');

const openRouter = express.Router();

const insertText = 'INSERT INTO usermodel (name, email) VALUES ($1, $2)';
const selectText = 'SELECT * FROM usermodel WHERE email = $1';

openRouter.get('/', async (req, res) => {
    const { rows } = await db.query("SELECT * FROM usermodel WHERE name = 'Luiz'");
    console.log(rows);
    res.send({user: rows[0]});
});

openRouter.post('/', async (req, res) => {
    const { body } = req;
    const result = await db.query(selectText, [body.email]);
    console.log(result.rowCount);
    if (result.rowCount > 0) {
        res.send({msg: 'User alread exists'});
    } else {
        console.log(body);
        const tst = await db.query(insertText, [body.name, body.email]);
        console.log(tst);
        res.send(body);
    }
});

module.exports = app => app.use('/user', openRouter);
