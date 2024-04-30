const router = require('express').Router()


const {User,Event,Bet} = require('../models')

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

router.post('/makebet', async (req, res) => {
    try {
        let betRaw = req.body
        let id = req.session.user_id 
        betRaw.user_id = id       
        const user = await User.findByPk(id)
        const event = await Event.findByPk(betRaw.event_id)
        let newBal =parseFloat(user.balance)-betRaw.amount
        user.update({balance: newBal})

        const bet = await Bet.create(betRaw)

        return res.json(bet)

    }
    catch (err) {
        handleError(res, err)
    }
})

module.exports = router;