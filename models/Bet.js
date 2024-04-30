const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')
const User = require('./User')
const Event = require('./Event')

class Bet extends Model { }

Bet.init(
    {
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: User,
        //         key: 'id',
        //     },
        // },
        // event_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Event,
        //         key: 'id',
        //     },
        // },
        // bet_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // amount: {
        //     type: DataTypes.DECIMAL,
        //     allowNull: false,
        //     validate: {
        //         min: 2 // Minimum bet amount
        //     }
        // },
        // odds: {
        //     type: DataTypes.DECIMAL,
        //     allowNull: false
        // }

    },
    {
        sequelize,
        modelName: 'bet'
    }
);

module.exports = Bet