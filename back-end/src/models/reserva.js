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
        dataHoraFinal: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quadraId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        observacoes: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    });

    Reserva.associate = models => {
        Reserva.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Reserva.belongsTo(models.Quadra, { foreignKey: 'quadraId', as: 'quadra' });
    };

    return Reserva;
};
