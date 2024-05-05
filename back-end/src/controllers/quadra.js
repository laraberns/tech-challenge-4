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
 
// getAllQuadras
const getAllQuadras = async (req, res) => {
    try {
        const quadras = await Quadra.findAll();
        return res.status(200).json(quadras);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar as quadras.' });
    }
};

// deleteQuadra
const deleteQuadra = async (req, res) => {
    const { id } = req.params;

    try {
        const quadra = await Quadra.findByPk(id);

        if (!quadra) {
            return res.status(404).json({ message: 'Quadra não encontrada.' });
        }

        await quadra.destroy();

        return res.status(200).json({ message: 'Quadra removida com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover a quadra.' });
    }
};

// editQuadra
const editQuadra = async (req, res) => {
    const { id } = req.params;
    const { nome, horarioInicial, horarioFinal, observacoes } = req.body;

    try {
        const quadra = await Quadra.findByPk(id);

        if (!quadra) {
            return res.status(404).json({ message: 'Quadra não encontrada.' });
        }

        quadra.nome = nome;
        quadra.horarioInicial = horarioInicial;
        quadra.horarioFinal = horarioFinal;
        quadra.observacoes = observacoes;

        await quadra.save();

        return res.status(200).json({ message: 'Quadra atualizada com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar a quadra.' });
    }
};

module.exports = {
    newQuadra,
    getAllQuadras,
    deleteQuadra,
    editQuadra
};
