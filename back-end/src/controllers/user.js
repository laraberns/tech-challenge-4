const db = require('../models')
const bcrypt = require('bcryptjs');

//main Model
const User = db.users

// create user
const newUser = async (req, res) => {
    const { email, password, type } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            type: type ? type : 'client'
        });

        res.status(200).send({
            id: user.id,
            email: user.email,
            type: user.type
        });
    } catch (error) {
        res.status(500).send('Erro ao criar novo usuário. Tente novamente.');
    }
}


// get all users
const getAllUsers = async (req, res) => {
    let users = await User.findAll({})
    res.status(200).send(users)
}

// get single user
const getOneUser = async (req, res) => {
    let email = req.params.email;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        res.status(200).json({ status: true, message: 'Usuário já existe' });
    } else {
        res.status(200).json({ status: false, message: 'Usuário não existe' });
    }
};


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
    getOneUser,
    updateUser,
    deleteUser
}