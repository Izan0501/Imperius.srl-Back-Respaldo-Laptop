// req: Recibe client data
// res: send an answer to client
const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) {
        res.status(400).send({ msg: 'necessary email' });
        return;
    }

    if (!password) {
        res.status(401).send({ msg: 'necessary password' });
        return;
    }

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        password: password,
        role: 'user',
        active: true
    });

    // HIDE PASS
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    // SAVE USER
    try {
        await user.save();
        res.status(200).send({ msg: 'saved user' })
    } catch (error) {
        res.status(400).send({ msg: `Error: ${error}` })
    }

}

module.exports = {
    register,
}