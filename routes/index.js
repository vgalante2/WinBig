const router = require('express').Router()

const users = require('./user_routes')

router.use('/users', users)

const events = require('./event_routes.js')

router.use('/events', events)

const bets = require('./bet_routes')

router.use('/bets', bets)

module.exports = router