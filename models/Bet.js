const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')

class Bet extends Model {}

Bet.init(
    {
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
            allowNull: false,
            validate: {
                min: 2 // Minimum bet amount
            }
        },
      
    },
    {
        sequelize,
        modelName: 'bet'
    }
);

module.exports = Bet