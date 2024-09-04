const User = require('../models/user')

async function getUser(req, res) {
    const { user_id } = req.user

    const user = await User.findById(user_id)

    if (!user) {
        res.status(400).send({msg: 'Undefined User'})
    } 

}

module.exports = {
    getUser,
}