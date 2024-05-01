const router = require('express').Router();
const { hash, compare } = require('bcrypt')

const { User, Event, Bet } = require('../models');
// const Event = require('../models/Event');
// const Bet = require('../models/Bet');

// The `/api/users` endpoint

async function handleError(err, res) {
    console.log(err)
    return res.redirect('/play')
}

function flip(){
    if(Math.floor(Math.random()*2)){
        return {outcome: 'heads'}
    }
    return {outcome: 'tails'}
}

function roll(){
    return {outcome: Math.floor(Math.random()*6)+1}
    
}

router.get('/', async (req, res) => {
    console.log(req.session.user_id)
    try {
        const users = await User.findAll(
            {
                include: { model: Bet },
            }
        )

        return res.json(users)

    }
    catch (err) {
        handleError(err, res)
    }
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.findByPk(id,
            {
                include: { model: Bet },
            })
        return res.json(user)

    }
    catch (err) {
        handleError(err, res)
    }
})

router.post('/auth/register', async (req, res) => {
    try {
        let newUser = req.body
        console.log(newUser)

        const user = await User.create(newUser)
        req.session.user_id = user.id
        return res.redirect('/play')

    } catch (err) {
        handleError(err, res)
    }
})

router.post('/auth/login', async (req, res) => {
    try {
        let input = req.body
        console.log(input)
        const user = await User.findOne({
            where: {
                username: input.username,
            }
        })
        if (user) {
            console.log(user)
            const is_valid = await user.validatePass(input.password)
            if (is_valid) {
                req.session.user_id = user.id
                return res.redirect('/play')
            }
            return res.redirect('/login')
        }
        return res.redirect('/register')

    } catch (err) {
        handleError(err, res)
    }
})

router.get('/auth/logout', async (req, res) => {
    try {
        req.session.destroy()
        return res.redirect('/logout')
    }
    catch (err) {
        handleError(err, res)
    }
})

router.put('/auth/update', async (req, res) => {
    try {
        let update = req.body
        let id = req.session.user_id
        console.log(update)
        if (update.password) {
            update.password = await hash(update.password, 10)
        }
        const user = await User.findByPk(id)
        user.update(update)
        return res.json(user)

    } catch (err) {
        handleError(err, res)
    }
})

router.delete('/auth/delete', async (req, res) => {
    let id = req.session.user_id
    try {
        const user = await User.findByPk(id)
        await user.destroy()

        return res.json({
            message: `User with ID ${id} removed from Database`
        })

    }
    catch (err) {
        handleError(err, res)
    }
});

router.post('/auth/bet', async (req, res) => {
    try {
        let betRaw = req.body
        let id = req.session.user_id 
        betRaw.user_id = id       
        const user = await User.findByPk(id)
        const event = await Event.findByPk(betRaw.event_id)
        let newBal =parseFloat(user.balance)-betRaw.amount
        user.update({balance: newBal})
        await Bet.create(betRaw)
        const outcome = event.event_name=='coinflip'?flip():roll()
        await event.resolveBets(outcome)
        return res.redirect('/play')

    }
    catch (err) {
        console.log(err)
        handleError(err, res)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let newUser = req.body
        let id = req.params.id
        console.log(newUser)
        if (newUser.password) {
            newUser.password = await hash(newUser.password, 10)
        }
        const user = await User.findByPk(id)
        user.update(newUser)
        return res.json(user)

    } catch (err) {
        handleError(err, res)
    }
});
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        const user = await User.findByPk(id)
        await user.destroy()
        return res.json({
            message: `User with ID ${id} removed from Database`
        })

    }
    catch (err) {
        handleError(err, res)
    }
});

module.exports = router;