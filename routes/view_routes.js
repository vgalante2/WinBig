const router = require('express').Router()


router.get('/', (req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/play', (req, res) => {
    res.render('play')
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