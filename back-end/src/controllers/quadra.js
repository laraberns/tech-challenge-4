const db = require('../models')

// Main Model
const Quadra = db.quadras

// Create Quadra
const newQuadra = async (req, res) => {
    const { nome, horarioInicial, horarioFinal, observacoes } = req.body;

    try {
        const existingQuadra = await Quadra.findOne({ where: { nome: nome } });
        if (existingQuadra) {
            return res.status(400).json({ message: 'Essa quadra já existe.' });
        }

        const quadra = await Quadra.create({
            nome,
            horarioInicial,
            horarioFinal,
            observacoes
        });

        return res.status(200).json({ message: 'Quadra criada com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a nova quadra. Tente novamente.' });
    }
};

module.exports = {
    newQuadra
};
