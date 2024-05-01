const router = require('express').Router()

const {User,Event,Bet} = require('../models')

function isAuth(req,res){
    if(!req.session.user_id){
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

router.get('/play', async(req, res) => {
    const auth = isAuth(req,res)
    let userObj = {
        isLoggedIn: false
    }
    if (auth){
        const user = await User.findByPk(req.session.user_id)
        userObj = {
            isLoggedIn: true,
            vars:{username: user.username,
                balance: user.balance}
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