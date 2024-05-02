const db = require('../models')
const bcrypt = require('bcryptjs');

// main Model
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

// verify user
const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'Credenciais incorretas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: 'Senha correta.' });
    } else {
      res.status(401).json({ message: 'Credenciais incorretas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
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
}

module.exports = {
    newUser,
    getOneUser,
    verifyUser
}