const router = require('express').Router()


const {User,Event,Bet} = require('../models')
// const User = require('../models/User')
// const Bet = require('../models/Bet')

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
        console.log(event)
        event.update(update)
        return res.json(event)

    } catch (err) {
        handleError(err,res)
    }
})

// router.post('/makebet', async (req, res) => {
//     try {
//         let betRaw = req.body
//         let id = req.session.user_id        
//         const user = await User.findByPk(id)
//         const event = await Event.findByPk(betRaw.event_id)

//         await event.createBet(player, { through: 'team_player' })

//         return res.json("player added")

//     }
//     catch (err) {
//         handleError(res, err)
//     }
// })

module.exports = router;