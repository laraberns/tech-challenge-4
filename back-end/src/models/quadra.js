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
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Quadra;
};
