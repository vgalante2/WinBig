const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')

class Event extends Model {}

Event.init(
    {
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           primaryKey: true,
           autoIncrement: true
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
      
    },
    {
        sequelize,
        modelName: 'event'
    }
);

module.exports = Event