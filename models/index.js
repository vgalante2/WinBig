const User = require('./User')
const Bet = require('./Bet')
const Event = require('./Event')

User.belongsToMany(Bet, { through: 'user_bets' })
Bet.belongsToMany(User, { through: 'user_bets' })

Event.belongsToMany(Bet, { through: 'bet_events'})
Bet.belongsToMany(Event, { through: 'bet_events' })

module.exports = {
  User: User,
  Bet: Bet,
  Event: Event

}