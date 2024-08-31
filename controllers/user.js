function getUser(req, res) {
    res.status(200).send({ msg: 'Got it!"' })
}

module.exports = {
    getUser,
}