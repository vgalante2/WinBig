const User = require('./User')
const Bet = require('./Bet')

User.belongsToMany(Bet, { through: 'user_bets' })
Bet.belongsToMany(User, { through: 'user_bets' })

module.exports = {
  User: User,
  Bet: Bet
}