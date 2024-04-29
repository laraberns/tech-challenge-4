const db = require('../models')

//main Model
const User = db.users

// create user
const newUser = async (req, res) => {
    let info = {
        email: req.body.email,
        password: req.body.password,
        type: req.body.type ? req.body.type : 'client'
    }
    const user = await User.create(info)
    res.status(200).send(user)
}

// get all users
const getAllUsers = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send(users)
}

// get single user
const getOneuser = async (req, res) => {
    let id = req.params.id
    const user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)
}

// update user
const updateUser = async (req, res) => {
    let id = req.params.id
    const user = await User.update(req.body, { where: { id: id } })
    res.status(200).send(user)
}

// delete user
const deleteUser = async (req, res) => {
    let id = req.params.id
    await User.destroy({ where: { id: id } })
    res.status(200).send('Product deleted!')
}

module.exports = {
    newUser,
    getAllUsers,
    getOneuser,
    updateUser,
    deleteUser
}