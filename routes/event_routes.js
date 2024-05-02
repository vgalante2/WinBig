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
        const events = await Event.findAll()
        return res.json(events)

    }
    catch (err) {
        handleError(err,res)
    }
})



router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const event = await Event.findByPk(id,
            {
                include: { model: Bet },
            })
        return res.json(event)

    }
    catch (err) {
        handleError(err,res)
    }
})


router.get('/wheel', async (req, res) => {
    try {
        const outcome = Math.floor(Math.random() * 8) + 1
        // const events = await Event.create({
        //     event_name: 'wheelspin',
        //     odds: {
        //         1: 0.125,
        //         2: 0.125,
        //         3: 0.125,
        //         4: 0.125,
        //         5: 0.125,
        //         6: 0.125,
        //         7: 0.125,
        //         8: 0.125
        //     } 
        // })

        // const user = await User.findByPk(req.session.user_id)

        return res.json({outcome: outcome})

    }
    catch (err) {
        handleError(err,res)
    }
})


router.post('/', async (req, res) => {
    try {
        let newEvent = req.body

        const event = await Event.create(newEvent)
        return res.json(event)

    } catch (err) {
        handleError(err,res)
    }
})
router.put('/:id', async (req, res) => {
    try {
        let update = req.body
        let id = req.params.id
        const event = await Event.findByPk(id,
            {
                include: { model: Bet },
            })
        event.update(update)
        event.bets.map(async (betObj) => {
            const bet = await Bet.findByPk(betObj.id)
            const result =update.outcome
            let payout = 0
            if(result ==bet.bet_name){
                payout = parseFloat(bet.amount)/parseFloat(bet.odds)
            }
            await bet.update({result, payout})
            if(!bet.resolved){
                const user = await User.scope('withoutPassword').findByPk(betObj.user_id)
                var newBal = parseFloat(user.balance)+parseFloat(bet.payout)
                await user.update({balance: newBal})

                await bet.update({resolved: true})

            }
            
        })
        return res.json(event)

    } catch (err) {
        handleError(err,res)
    }
})

router.put('/resolve/:id', async (req, res) => {
    try {
        let update = req.body
        let event_id = req.params.id
        const event = await Event.findByPk(event_id)
        event.update(update)
        return res.json(event)

    } catch (err) {
        handleError(err,res)
    }
})


module.exports = router;