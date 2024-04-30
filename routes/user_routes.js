const router = require('express').Router();
const { hash, compare } = require('bcrypt')

const { User, Event, Bet } = require('../models');
// const Event = require('../models/Event');
// const Bet = require('../models/Bet');

// The `/api/users` endpoint

async function handleError(err, res) {
    console.log(err)
    return res.json({
        message: 'Bad Request',
        error: err
    })
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

router.post('/', async (req, res) => {
    try {
        let newUser = req.body

        const user = await User.create(newUser)
        req.session.user_id = user.id
        return res.json(user)

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
            const is_valid = await user.validatePass(input.password)
            if (is_valid) {
                req.session.user_id = user.id
                return res.json({ message: 'Passwords Match. User session created' })
            }
            return res.json({ message: 'Incorrect Password' })
        }
        return res.json({ message: 'No User with that name' })

    } catch (err) {
        handleError(err, res)
    }
})

router.get('/auth/logout', async (req, res) => {
    try {
        req.session.destroy()
        return res.json({ message: 'Logged out' })
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

// router.post('/auth/bet', async (req, res) => {
//     try {
//         let id = req.session.user_id
//         let relObj = req.body
//         const user = await User.findByPk(id)
//         const bet = await Bet.findByPk(relObj.team_id)

//         await user.createBet(bet, { through: 'team_player' })

//         return res.json("player added")

//     }
//     catch (err) {
//         handleError(res, err)
//     }
// })

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