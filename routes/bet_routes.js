const router = require('express').Router()


const Bet = require('../models/Bet')

async function handleError(err, res) {
    console.log(err)
    return res.json({
        message: 'Bad Request',
        error: err
    })
}

router.get('/', async (req, res) => {
    try {
        const bets = await Bet.findAll()
        return res.json(bets)

    }
    catch (err) {
        handleError(err,res)
    }
})

router.post('/', async (req, res) => {
    try {
        let newBet = req.body

        const bet = await Bet.create(newBet)
        return res.json(bet)

    } catch (err) {
        handleError(err,res)
    }
})
router.put('/:id', async (req, res) => {
    try {
        let update = req.body
        let id = req.params.id
        const bet = await Bet.findByPk(id)
        bet.update(update)
        return res.json(bet)

    } catch (err) {
        handleError(err,res)
    }
});

module.exports = router;