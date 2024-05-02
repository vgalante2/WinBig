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
        res.render('coin-toss', userObj)
    }
    else {res.render('login', userObj)}
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
        res.render('dice', userObj)
    }
    else {res.render('login', userObj)}
})

router.get('/free', async (req, res) => {
    const auth = isAuth(req, res);
    if (auth) {
        try {
            const user = await getUserObj(req.session.user_id);
            const userObj = {
                isLoggedIn: true,
                user: user 
            };
            console.log(userObj); // Log userObj to verify it contains the correct user information
            res.render('free', userObj);
        } catch (error) {
            console.error('Error fetching user information:', error);
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
});

router.post('/free', async (req, res) => {
    const { guess, isCorrect } = req.body;

    try {
      
        const user = await User.findByPk(req.session.user_id);

        if (!user) {
            
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Process the guess data here (e.g., update user's balance if guess is correct)
        if (isCorrect) {
            // Update user's balance
            user.balance = parseInt(user.balance, 10);
            user.balance += 50 // Increment the balance by 50 coins
        }

        await user.save();

        
        res.json(user.guess);
    } catch (error) {
        console.error('Error updating user balance:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/wheel', async (req, res) => {
    const auth = isAuth(req, res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth) {
        userObj.isLoggedIn = true
        userObj.user = await getUserObj(req.session.user_id)
    }

    res.render('wheel', userObj)
})


module.exports = router