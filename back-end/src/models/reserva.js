module.exports = (sequelize, DataTypes) => {
    const Reserva = sequelize.define('reserva', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dataHoraInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantidadeHoras: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataHoraFim: {
            type: DataTypes.VIRTUAL,
            get() {
                const inicio = this.getDataValue('dataHoraInicio');
                const horas = this.getDataValue('quantidadeHoras');
                if (inicio && horas) {
                    const fim = new Date(inicio);
                    fim.setHours(fim.getHours() + horas);
                    return fim;
                }
                return null;
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        quadraId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Quadra', 
                key: 'id'
            }
        }
    });

    // Relacionamentos
    Reserva.belongsTo(sequelize.models.User, { foreignKey: 'userId', as: 'user' });
    Reserva.belongsTo(sequelize.models.Quadra, { foreignKey: 'quadraId', as: 'quadra' });

    return Reserva;
};
