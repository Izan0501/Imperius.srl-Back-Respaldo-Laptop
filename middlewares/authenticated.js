const jwt = require('../utils/jwt')

function asureAuth(req, res, next) {

    if (!req.headers.authorization) {
        res.status(403).send({ msg: 'Petition without a headers' })
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const payload = jwt.decode(token);
        
        const { exp } = payload;
        const currentDate = new Date().getTime();

        if (exp <= currentDate) {
            return res.status(400).send({ msg: 'Token was expired' })
        } else {

        }

        req.user = payload;
        next();

    } catch (error) {
        return res.status(400).send({ msg: 'ivalid token' })
    }

    // if is validating(next)
    next();

}

module.exports = {
    asureAuth
}