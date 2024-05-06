const db = require('../models')
const bcrypt = require('bcryptjs');

const User = db.users

const newUser = async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Este usuário já existe. Por favor, escolha outro email.' });
    }

    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 1 número e 8 caracteres.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      type: type ? type : 'client'
    });

    return res.status(200).json({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar novo usuário. Tente novamente.' });
  }
}

const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'Credenciais incorretas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      let userType = user.type;
      res.status(200).json({ userType: userType, userId: user.id });
    } else {
      res.status(401).json({ message: 'Credenciais incorretas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

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