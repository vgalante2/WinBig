const router = require('express').Router()

const { User, Event, Bet } = require('../models')

function isAuth(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    return next()
}


router.get('/', async (req, res) => {

    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('home', userObj)
})

router.get('/about', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('about', userObj)
})

router.get('/play', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: true,
        user: req.user
    }
    res.render('play', userObj)

})

router.get('/register', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('register', userObj)
})

router.get('/login', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }
    res.render('login', userObj)
})

router.get('/logout', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('logout', userObj)
})

router.get('/user', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: true,
        user: req.user
    }
    const user = await User.findByPk(req.user.id)
    const bets = await user.getUserBets(6)

    userObj.bets = bets
    res.render('user', userObj)
})

router.get('/coin-toss', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: true,
        user: req.user
    }
    const coin = await Event.create({
        event_name: "coinflip",
        odds: {
            heads: 0.50,
            tails: 0.50
        }
    })

    userObj.coin = {
        user_id: req.user.id,
        username: req.user.username,
        balance: req.user.balance,
        event_id: coin.id,
        event_name: coin.event_name,
        choices: Object.keys(coin.odds),
        odds: coin.odds.heads
    }
    res.render('coin-toss', userObj)

})

router.get('/dice', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: true,
        user: req.user
    }

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
        user_id: req.user.id,
        username: req.user.username,
        balance: req.user.balance,
        event_id: die.id,
        event_name: die.event_name,
        choices: Object.keys(die.odds),
        odds: die.odds[1]
    }
    res.render('dice', userObj)
})

router.get('/free', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: true,
        user: req.user
    }
    res.render('free', userObj);
});

router.post('/free', isAuth, async (req, res) => {
    const { guess } = req.body;
    const user = await User.findByPk(req.user.id)
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    // Check if the guess is correct
    const isCorrect = guess === randomNumber;
    // Process the guess data here (e.g., update user's balance if guess is correct)
    if (isCorrect) {
        // Update user's balance
        user.balance = parseInt(user.balance, 10);
        user.balance += 50 // Increment the balance by 50 coins
    }

    await user.save();
    res.json({ balance: user.balance,
        isCorrect
     });
});

// router.get('/wheel', isAuth, async (req, res) => {
//     let userObj = {
//         isLoggedIn: req.user ? true : false,
//         user: req.user
//     }
//     res.render('wheel', userObj)
// })
router.get('/updateuser', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

    res.render('updateuser', userObj)
})
router.get('/deleteuser', isAuth, async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

        res.render('deleteuser', userObj)
    

})
router.get('/*', async (req, res) => {
    let userObj = {
        isLoggedIn: req.user ? true : false,
        user: req.user
    }

        res.render('home', userObj)
    

})



module.exports = router