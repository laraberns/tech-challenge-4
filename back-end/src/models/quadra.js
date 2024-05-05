module.exports = (sequelize, DataTypes) => {
    const Quadra = sequelize.define('quadra', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        horarioInicial: {
            type: DataTypes.TIME, 
            allowNull: false
        },
        horarioFinal: {
            type: DataTypes.TIME,
            allowNull: false
        }
    });

    return Quadra;
};
