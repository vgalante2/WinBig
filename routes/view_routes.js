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


module.exports = router