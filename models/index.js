const User = require('./User')
const Event = require('./Event')
const Bet = require('./Bet')

// User.hasMany(Bet)
// Bet.hasOne(User)

// Event.hasMany(Bet)
// Bet.hasOne(Event)

// Bet.User = Bet.belongsTo(User)
// Bet.Event = Bet.belongsTo(Event)

User.hasMany(Bet, {
    foreignKey: 'user_id'
  })
Event.hasMany(Bet, {
    foreignKey: 'event_id'
  })

// User.belongsToMany(Event, { through: Bet })
module.exports = {User,Event,Bet}