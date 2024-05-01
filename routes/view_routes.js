const router = require('express').Router()

const { User, Event, Bet } = require('../models')

function isAuth(req, res) {
    if (!req.session.user_id) {
        return false
    }
    return true
}


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/play', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        const user = await User.findByPk(req.session.user_id)
        const coin = await Event.create({
            event_name: "coinflip",
            odds: {
                heads: 0.50,
                tails: 0.50
            }

        })
        const die = await Event.create({
            event_name: "diceroll",
            odds: {
                1: 0.1666666,
                2: 0.1666666,
                3: 0.1666666,
                4: 0.1666666,
                5: 0.1666666,
                6: 0.1666666,
            }
        })
        userObj = {
            isLoggedIn: true,
            coin: {
                username: user.username,
                balance: user.balance,
                event_id: coin.id,
                choices: Object.keys(coin.odds),
                odds: coin.odds.heads
            },
            die: {
                username: user.username,
                balance: user.balance,
                event_id: die.id,
                choices: Object.keys(die.odds),
                odds: die.odds[1]
            },

        }

    }
    res.render('play', userObj)

})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {

    res.render('logout')
})

router.get('/coin-toss', (req, res) => {
    res.render('coin-toss')
})

router.get('/dice', (req, res) => {
    
    res.render('dice')
})


module.exports = router