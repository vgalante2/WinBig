const router = require('express').Router();
const { hash, compare } = require('bcrypt')

const User = require('../models/User');

// The `/api/users` endpoint

async function handleError(err){
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
}

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)

  }
  catch (err) {
   handleError(err)
  }
})

router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const user = await User.findByPk(id)
    return res.json(user)

  }
  catch (err) {
    handleError(err)
  }
})

router.post('/', async (req, res) => {
  try {
    let newUser = req.body

    const user = await User.create(newUser)
    return res.json(user)

  } catch (err) {
    handleError(err)
  }
})

router.post('/login', async (req, res) => {
    try {
      let input = req.body
      console.log(input)
      const user = await User.findOne({
        where: {
          username: input.username,
        }
      })
      if(user){
        const is_valid = await user.validatePass(input.password)
        console.log(is_valid)
        if(is_valid){
            return res.json({message: 'Passwords Match'})
        }
        return res.json({message: 'Incorrect Password'})
      }
      return res.json({message: 'No User with that name'})
  
    } catch (err) {
        handleError(err)
    }
  })

router.put('/:id', async (req, res) => {
  try {
    let newUser = req.body
    let id = req.params.id
    console.log(newUser)
    if(newUser.password){
        newUser.password =  await hash(newUser.password, 10)
    }
    const user = await User.findByPk(id)
    user.update(newUser)
    return res.json(user)

  } catch (err) {
    handleError(err)
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
    handleError(err)
  }
});

module.exports = router;