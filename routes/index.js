const router = require('express').Router()
const User = require('../models/User.js')
async function attachUser(req, res, next) {
    const user_id = req.session.user_id
    if (user_id) {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'username', 'email', 'balance']
        })
        req.user = user.get({plain:true})
        req.user.balance = req.user.balance.toFixed(2)
        return next()
    }
    next()
}
const users = require('./user_routes')

router.use('/api/users',attachUser, users)

const events = require('./event_routes.js')

router.use('/api/events',attachUser, events)

const bets = require('./bet_routes')

router.use('/api/bets',attachUser, bets)

const views = require('./view_routes.js')

router.use('/',attachUser, views)

module.exports = router