const router = require('express').Router()

const { User, Event, Bet } = require('../models')

function isAuth(req, res) {
    if (!req.session.user_id) {
        return false
    }
    return true
}
async function getUserObj(id) {
    const user = await User.findByPk(id)
    const userObj = {
        user_id: user.id,
        username: user.username,
        balance: parseFloat(user.balance).toFixed(2).toString()
    }

    return userObj
}


router.get('/', async (req, res) => {

    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }

    res.render('home', userObj)
})

router.get('/about', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }

    res.render('about', userObj)
})

router.get('/play', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }
    res.render('play', userObj)

})

router.get('/register', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }

    res.render('register', userObj)
})

router.get('/login', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }
    res.render('login', userObj)
})

router.get('/logout', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }

    res.render('logout', userObj)
})

router.get('/user', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }
    const user = await User.findByPk(req.session.user_id)

    const bets = await user.getUserBets()
    console.log(bets)
    // we are currently send userObj with id username and balance. we need below bet info
    //  <td>{{this.id}}</td>
    //  <td>{{this.event_id}}</td>
    // <td>{{this.name}}</td>
    // <td>{{this.odds}}</td>
    // <td>{{this.amount}}</td>
    // <td>{{this.payout}}</td>
    // <td>{{this.net}}</td>
    userObj.bets = bets

    res.render('user', userObj)
})

router.get('/coin-toss', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        const user = await getUserObj(req.session.user_id)
        userObj.user = user

        const coin = await Event.create({
            event_name: "coinflip",
            odds: {
                heads: 0.50,
                tails: 0.50
            }
        })

        userObj.coin = {
            user_id: user.user_id,
            username: user.username,
            balance: user.balance,
            event_id: coin.id,
            event_name: coin.event_name,
            choices: Object.keys(coin.odds),
            odds: coin.odds.heads
        }
    }
    res.render('coin-toss', userObj)
})

router.get('/dice', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        const user = await getUserObj(req.session.user_id)
        userObj.user = user

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

        userObj.die = {
            user_id: user.user_id,
            username: user.username,
            balance: user.balance,
            event_id: die.id,
            event_name: die.event_name,
            choices: Object.keys(die.odds),
            odds: die.odds[1]
        }
    }
    res.render('dice', userObj)
})


module.exports = router