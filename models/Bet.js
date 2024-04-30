const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')
// const User = require('./User')
// const Event = require('./Event')

class Bet extends Model { }

Bet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'events',
                key: 'id',
            },
            allowNull: false
        },
        bet_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 2 // Minimum bet amount
            }
        },
        odds: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING
        },
        payout: {
            type: DataTypes.DECIMAL
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
    {
        sequelize,
        modelName: 'bet'
    }
);

module.exports = Bet