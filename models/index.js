const User = require('./User')
const Bet = require('./Bet')
const Event = require('./Event')

User.hasMany(Bet)
Bet.belongsTo(User)

Event.hasMany(Bet)
Bet.belongsTo(Event)

module.exports = {
  User: User,
  Bet: Bet,
  Event: Event

}