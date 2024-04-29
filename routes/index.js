const router = require('express').Router()

const users = require('./user_routes')



router.use('/users', users)



module.exports = router