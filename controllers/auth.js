const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt')

async function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) {
        res.status(400).send({ msg: 'Necessary email' });
        return;
    }

    if (!password) {
        res.status(401).send({ msg: 'Necessary password' });
        return;
    }

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        password: password,
        role: 'user',
        active: true
    })

    // HIDE PASS
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    // SAVE USER
    try {
        await user.save();
        res.status(200).send({ msg: 'Saved user' })
    } catch (error) {
        res.status(400).send({ msg: `Error: ${error}` })
    }

};

async function login(req, res) {
    //Getting data
    const { email, password } = req.body;

    //Validations
    if (!email) res.status(400).send({ msg: 'Obligatory Email' });

    if (!password) res.status(400).send({ msg: 'Obligatory Password' });

    //Credential identification
    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) res.status(400).send({ msg: "Incorrect Email" });

        const check = await bcrypt.compare(password, user.password);

        if (!check) {

            res.status(400).send({ msg: "Incorrect Password" });

        } else res.status(200).send({ access: jwt.createAccessToken(user) });


    } catch (error) {
        res.status(500).send({ msg: 'Server Error' });
    }
}

module.exports = {
    login,
    register,
}