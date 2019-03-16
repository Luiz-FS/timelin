const express = require('express');
const utils = require('../util/utils');
const User = require('../models/user');


const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
    const { body } = req;
    const { email, password } = body;
    const result = await User.checkCredentials(email, password);

    if (result.rowCount === 0)
        return res.status(401).send({msg: 'Inavlid email or password'});
    
    const { id, name } = result.rows[0];
    const token = utils.generateToken({id});

    res.send({user: {name, email, token}});
});

module.exports = (app) => app.use('/api/auth', authRouter);