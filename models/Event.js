const sequelize = require('../db/client')
const { DataTypes, Model } = require('sequelize')
const Bet = require('./Bet')
const User = require('./User')


class Event extends Model {
    async resolveBets(result){
        try {
            let update = result
            let id = this.id
            const event = await Event.findByPk(id,
                {
                    include: { model: Bet },
                })
            await event.update(update)
            if(!event.bets.length){
                return false
            }
            
            return new Promise((resolve, reject) => {
                event.bets.map(async (betObj) => {
                    const bet = await Bet.findByPk(betObj.id)
                    const result =update.outcome
                    let payout = 0
                    if(result ==bet.bet_name){
                        payout = parseFloat(bet.amount)/parseFloat(bet.odds)
                    }
                    await bet.update({result, payout})
                    if(!bet.resolved){
                        const user = await User.findByPk(betObj.user_id)
                        var newBal = parseFloat(user.balance)+parseFloat(bet.payout)
                        await user.update({balance: newBal})
        
                        await bet.update({resolved: true})
                        resolve()
                    } else resolve()
                })
            })
    
        } catch (err) {
            console.log(err)
        }
    }
}

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