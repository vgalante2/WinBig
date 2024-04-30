const User = require('./User')
const Event = require('./Event')
const Bet = require('./Bet')


User.hasMany(Bet, {
    foreignKey: 'user_id'
  })
Event.hasMany(Bet, {
    foreignKey: 'event_id'
  })


module.exports = {User,Event,Bet}