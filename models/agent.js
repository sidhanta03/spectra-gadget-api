module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define('Agent', {
        agent_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
    
    return Agent;
};
