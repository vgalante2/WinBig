const router = require('express').Router()

const users = require('./user_routes')

router.use('/users', users)

const events = require('./event_routes')

router.use('/events', events)

module.exports = router