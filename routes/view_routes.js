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
        balance: user.balance
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

    // const auth = isAuth(req, res)
    // let userObj = {
    //     isLoggedIn: false
    // }
    // if (auth) {
    //     const user = await User.findByPk(req.session.user_id)
    //     const coin = await Event.create({
    //         event_name: "coinflip",
    //         odds: {
    //             heads: 0.50,
    //             tails: 0.50
    //         }

    //     })
    //     const die = await Event.create({
    //         event_name: "diceroll",
    //         odds: {
    //             1: 0.1666666,
    //             2: 0.1666666,
    //             3: 0.1666666,
    //             4: 0.1666666,
    //             5: 0.1666666,
    //             6: 0.1666666,
    //         }
    //     })
    //     userObj = {
    //         isLoggedIn: true,
    //         coin: {
    //             username: user.username,
    //             balance: user.balance,
    //             event_id: coin.id,
    //             choices: Object.keys(coin.odds),
    //             odds: coin.odds.heads
    //         },
    //         die: {
    //             username: user.username,
    //             balance: user.balance,
    //             event_id: die.id,
    //             choices: Object.keys(die.odds),
    //             odds: die.odds[1]
    //         },

    //     }

    // }
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
            choices: Object.keys(coin.odds),
            odds: coin.odds.heads
        }
    }
    console.log(userObj)
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
            choices: Object.keys(die.odds),
            odds: die.odds[1]
        }
    }
    console.log(userObj)
    res.render('dice', userObj)
})


module.exports = router