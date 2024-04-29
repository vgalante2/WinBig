const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')

class Bet extends Model {}

Bet.init (
    {
        bet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }
       


    
    },
    {
        sequelize,
        modelName: 'bet'
    }
)

module.exports = Bet