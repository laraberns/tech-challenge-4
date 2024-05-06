const db = require('../models');
const Reserva = db.reservas;
const Quadra = db.quadras;


const getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        return res.status(200).json(reservas);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar as reservas.' });
    }
};

const newReserva = async (req, res) => {
    try {
        const { dataHoraInicio, dataHoraFinal, userId, quadraId, observacoes } = req.body;

        // Obter horário de abertura e fechamento da quadra
        const quadra = await Quadra.findByPk(quadraId);
        if (!quadra) {
            return res.status(404).json({ message: 'Quadra não encontrada.' });
        }

        const horarioAbertura = new Date(dataHoraInicio);
        const horarioFechamento = new Date(dataHoraFinal);

        const quadraAbertura = new Date(dataHoraInicio);
        quadraAbertura.setUTCHours(parseInt(quadra.horarioInicial.split(':')[0]), parseInt(quadra.horarioInicial.split(':')[1]), 0, 0);

        const quadraFechamento = new Date(dataHoraFinal);
        quadraFechamento.setUTCHours(parseInt(quadra.horarioFinal.split(':')[0]), parseInt(quadra.horarioFinal.split(':')[1]), 0, 0);

        // Verificar se a reserva está dentro do horário de funcionamento da quadra
        if (horarioAbertura < quadraAbertura || horarioFechamento > quadraFechamento) {
            return res.status(400).json({ message: 'A reserva está fora do horário de funcionamento da quadra.' });
        }

        // Verificar se a reserva se sobrepõe a reservas existentes
        const existingReservas = await Reserva.findAll({
            where: {
                quadraId: quadraId
            }
        });

        for (const reserva of existingReservas) {
            const reservaInicio = new Date(reserva.dataHoraInicio);
            const reservaFim = new Date(reserva.dataHoraFinal);

            if (
                (horarioAbertura >= reservaInicio && horarioAbertura < reservaFim) ||
                (horarioFechamento > reservaInicio && horarioFechamento <= reservaFim) ||
                (horarioAbertura <= reservaInicio && horarioFechamento >= reservaFim)
            ) {
                return res.status(400).json({ message: 'Já existe uma reserva para esta quadra no mesmo intervalo de tempo.' });
            }
        }

        // Criar a nova reserva
        const novaReserva = await Reserva.create({
            dataHoraInicio,
            dataHoraFinal,
            userId,
            quadraId,
            observacoes 
        });

        return res.status(201).json({ message: 'Reserva criada!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a nova reserva. Tente novamente.' });
    }
};


const getAvailableTimesForDay = async (req, res) => {
    try {
        const { quadraId, quantidadeHoras, dia } = req.body;

        const quadra = await Quadra.findByPk(quadraId);
        if (!quadra) {
            return res.status(404).json({ message: 'Quadra não encontrada.' });
        }

        const horarioAbertura = new Date(dia);
        horarioAbertura.setUTCHours(parseInt(quadra.horarioInicial.split(':')[0]), parseInt(quadra.horarioInicial.split(':')[1]), 0, 0);
        
        const horarioFechamento = new Date(dia);
        horarioFechamento.setUTCHours(parseInt(quadra.horarioFinal.split(':')[0]), parseInt(quadra.horarioFinal.split(':')[1]), 0, 0);  

        // Obter reservas para a quadra no dia especificado
        const reservas = await Reserva.findAll({
            where: {
                quadraId: quadraId,
                dataHoraInicio: {
                    [db.Sequelize.Op.between]: [horarioAbertura, horarioFechamento]
                }
            }
        })

        // Calcular horários disponíveis
        const horariosDisponiveis = [];
        let horaAtual = new Date(horarioAbertura);

        while (horaAtual <= horarioFechamento) {
            let horaFinal = new Date(horaAtual);
            horaFinal.setHours(horaFinal.getHours() + quantidadeHoras);

            let disponivel = true;
            for (const reserva of reservas) {
                const reservaInicio = new Date(reserva.dataHoraInicio);
                const reservaFim = new Date(reserva.dataHoraFinal);

                if (
                    (horaAtual >= reservaInicio && horaAtual < reservaFim) ||
                    (horaFinal > reservaInicio && horaFinal <= reservaFim) ||
                    (horaAtual <= reservaInicio && horaFinal >= reservaFim)
                ) {
                    disponivel = false;
                    break;
                }
            }

            if (disponivel && horaFinal <= horarioFechamento) { // Verificar se o horário final está dentro do horário de funcionamento da quadra
                horariosDisponiveis.push({
                    horaInicio: horaAtual.toISOString(),
                    horaFinal: horaFinal.toISOString()
                });
            }

            horaAtual.setHours(horaAtual.getHours() + 1); // Avançar 1 hora
        }

        return res.status(200).json(horariosDisponiveis);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar os horários disponíveis. Tente novamente.' });
    }
};

module.exports = {
    getAvailableTimesForDay,
    getAllReservas,
    newReserva
};
