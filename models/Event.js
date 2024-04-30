const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')

class Event extends Model {}

Event.init(
    {
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        odds: {
            type: DataTypes.JSON,
            allowNull: false
        },
        outcome: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'event'
    }
);

module.exports = Event