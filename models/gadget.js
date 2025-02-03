module.exports = (sequelize, DataTypes) => {
    const Gadget = sequelize.define('Gadget', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
            defaultValue: 'Available'
        },
        missionSuccessProbability: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        codename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        decommissionedAt: {
            type: DataTypes.DATE,
            allowNull: true // Timestamp when gadget is decommissioned
        }
    }, {
        timestamps: true, 
    });

    return Gadget;
};
