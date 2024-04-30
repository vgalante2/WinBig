const User = require('./User')
const Event = require('./Event')
const Bet = require('./Bet')

// User.hasMany(Bet)
// Bet.hasOne(User)

// Event.hasMany(Bet)
// Bet.hasOne(Event)

Bet.User = Bet.belongsTo(User)
Bet.Event = Bet.belongsTo(Event)

// User.belongsToMany(Event, { through: Bet })