const router = require('express').Router()

const users = require('./user_routes')

router.use('/api/users', users)

const events = require('./event_routes.js')

router.use('/api/events', events)

const bets = require('./bet_routes')

router.use('/api/bets', bets)

const views = require('./view_routes.js')

router.use('/', views)

module.exports = router