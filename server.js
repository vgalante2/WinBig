require('dotenv').config()
const sequelize = require('./db/client')
const express = require('express')
const routes = require('./routes')
const { engine } = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const store = new SequelizeStore({ db: sequelize })
const {User,Event,Bet} = require('./models')

const app = express()
const PORT = process.env.PORT||3333

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session(
    {
        secret: 'test',
        store,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000000 }
    }
))

// Create a GET route for every file in public
app.use(express.static('public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/', routes)

// function flip(){
//     if(Math.floor(Math.random()*2)){
//         return {outcome: 'heads'}
//     }
//     return {outcome: 'tails'}
// }

// async function delay(time){
//     return new Promise(res=>setTimeout(res,time))
// } 
    

// async function flipCoins(){
//     const event = await Event.create({
//         event_name: "coinflip",
//         odds: {
//             heads: 0.50,
//             tails: 0.50
//         }
//     })

//     await delay(25000)
//     console.log('hi')
//     event.resolveBets(flip())
// };

// Set interval for the repetitive task

sequelize.sync({force: true})
.then(()=>{
    app.listen(PORT,() => {
        console.log('Server running on port: ', PORT)
        // setInterval(flipCoins, 30000)



    })
})