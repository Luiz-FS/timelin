const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    const regex = /^Bearer\s([a-zA-Z0-9]+)/;

    if (!authorization)
        return res.status(401).send({msg: 'No token provider'});
    
    if (!regex.test(authorization))
        return res.status(401).send({msg: 'Malformed token'});


    const token = authorization.replace(regex, '$1');
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        req.idLogged = decoded.id;
        return next();
    });
};